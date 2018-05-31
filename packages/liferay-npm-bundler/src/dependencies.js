import PkgDesc from 'liferay-npm-build-tools-common/lib/pkg-desc';
import path from 'path';
import readJsonSync from 'read-json-sync';
import resolveModule from 'resolve';

import report from './report';

const pkgJson = readJsonSync(path.join('.', 'package.json'));
const rootPkg = new PkgDesc(pkgJson.name, pkgJson.version);

/**
 * Get root package descriptor
 * @return {PkgDesc} the root package descriptor
 */
export function getRootPkg() {
	return rootPkg;
}

/**
 * Recursively find the dependencies of a package and return them as PkgDesc
 * objects.
 * @param {String} basedir directory where package lives in
 * @param {Array} extraDependencies an array of package names to add to
 * 									dependencies collected from package.json
 * @return {Object} a hash of objects where key is the package id and values are PkgDesc objects
 */
export function getPackageDependencies(basedir, extraDependencies = []) {
	const packageJson = readJsonSync(path.join(basedir, '/package.json'));
	const pkg = new PkgDesc(
		packageJson.name,
		packageJson.version,
		basedir == '.' ? null : basedir
	);

	const pkgs = {};
	pkgs[pkg.id] = pkg;

	let dependencies = packageJson.dependencies || [];
	dependencies = Object.keys(dependencies);
	dependencies = dependencies.concat(extraDependencies);

	let dependencyDirs = dependencies
		.map(function(dependency) {
			return resolveDependencyDir(basedir, packageJson, dependency);
		})
		.filter(dependencyDir => {
			return dependencyDir != null;
		});

	dependencyDirs.forEach(function(dependencyDir) {
		const depPkgs = getPackageDependencies(dependencyDir);

		Object.keys(depPkgs).forEach(function(pkgId) {
			pkgs[pkgId] = depPkgs[pkgId];
		});
	});

	return pkgs;
}

/**
 * Resolves a dependency package and returns its directory.
 * @param {String} packageDir the base directory used for resolution
 * @param {Object} packageJson the package.json object
 * @param {String} dependency a package name
 * @return {String} the path of the directory containing the dependency package
 */
function resolveDependencyDir(packageDir, packageJson, dependency) {
	try {
		const pkgJsonFile = resolveModule.sync(dependency + '/package.json', {
			basedir: packageDir,
		});

		return path.dirname(pkgJsonFile);
	} catch (err) {
		if (
			packageJson.optionalDependencies &&
			packageJson.optionalDependencies[dependency]
		) {
			report.warn(
				`Optional dependency '${dependency}' of ` +
					`'${packageJson.name}' could not be found in ` +
					`node_modules: it will be missing in the output bundle.`
			);

			return null;
		} else {
			throw err;
		}
	}
}
