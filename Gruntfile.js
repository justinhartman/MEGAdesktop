/**
 * Gruntfile for changelog, version bumps and git workflow.
 *
 * @author     Justin Hartman <code@justinhartman.co>
 * @link       https://justinhartman.co
 * @copyright  Copyright (c) 2021-2022 Justin Hartman
 * @licence    https://github.com/justinhartman/MEGAdesktop/blob/main/LICENSE MIT
 * @since      1.0.0
 */

module.exports = function (grunt) {
    grunt.loadNpmTasks('git-changelog');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-git');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: ['pkg', 'git_changelog'],
                commit: false,
                createTag: false,
                push: false,
                globalReplace: true,
                prereleaseName: false,
                metadata: '',
                regExp: false,
            },
        },
        git_changelog: {
            main: {
                options: {
                    app_name: 'MEGAdesktop Changelog',
                    logo: 'https://github.com/justinhartman/MEGAdesktop/raw/main/docs/images/icon.png',
                    intro: 'Detailed changelog of revisions to the MEGAdesktop app.',
                    branch: 'main',
                    repo_url: 'https://github.com/justinhartman/MEGAdesktop',
                    file: 'docs/tags/<%= pkg.version %>.md',
                    template: 'docs/tags/templates/log_template.md',
                    commit_template: 'docs/tags/templates/log_commit_template.md',
                    sections : [
                        {
                            'title': 'New Features',
                            'grep': '^feat',
                        },
                        {
                            'title': 'Bug Fixes',
                            'grep': '^fix',
                        },
                        {
                            'title': 'Breaking Changes',
                            'grep': '^break',
                        },
                        {
                            'title': 'Refactored Code',
                            'grep': '^refact',
                        },
                        {
                            'title': 'Testing',
                            'grep': '^test',
                        },
                        {
                            'title': 'Documentation',
                            'grep': '^docs',
                        },
                        {
                            'title': 'Style Changes',
                            'grep': '^style',
                        },
                        {
                            'title': 'StyleCI Fixes',
                            'grep': '^Apply fixes from',
                        },
                        {
                            'title': 'Core Updates',
                            'grep': '^chore',
                        },
                        {
                            'title': 'Yarn Package Updates',
                            'grep': '^yarn',
                        },
                        {
                            'title': 'Branches Merged',
                            'grep': '^Merge branch',
                        },
                        {
                            'title' : 'Pull Requests Merged',
                            'grep': '^Merge pull request',
                        },
                    ],
                },
            },
        },
        gitadd: {
            task: {
                files: {
                    src: ['docs/tags', 'package.json', 'yarn.lock', 'README.md'],
                },
            },
        },
        gitcommit: {
            your_target: {
                options: {
                    message: 'chore: Tag Version <%= pkg.version %>',
                    description: 'Add files for tag <%= pkg.version %>.',
                },
            },
        },
        gittag: {
            addtag: {
                options: {
                    tag: '<%= pkg.version %>',
                    message: 'chore(release): Release Version <%= pkg.version %>',
                },
            },
        },
        gitpush: {
            your_target: {
                options: {
                    remote: 'origin',
                    branch: 'main',
                    tags: true,
                },
            },
        },
    });
    grunt.registerTask('bump-changelog', ['bump', 'git_changelog']);
    grunt.registerTask('publish', ['gitadd', 'gitcommit', 'gittag', 'gitpush']);
    grunt.registerTask('minor', ['bump:minor', 'git_changelog', 'publish']);
    grunt.registerTask('major', ['bump:major', 'git_changelog', 'publish']);
    grunt.registerTask('default', ['bump', 'git_changelog', 'publish']);
};
