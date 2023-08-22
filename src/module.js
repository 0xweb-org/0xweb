(function () {
    let cwd = process.cwd();
    /** Fix require paths, to be able to load local node_modules from global installation */
    if (typeof module !== 'undefined' && Array.isArray(module?.paths)) {
        module.paths.push(cwd);
    }
    if (typeof require !== 'undefined' && Array.isArray(require?.main?.paths)) {
        require.main.paths.push(cwd);
    }
}());


(function () {
    /**MODULE**/
}());


