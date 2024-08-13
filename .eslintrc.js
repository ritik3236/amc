module.exports = {
    env: {
        browser: false,
        es2021: true,
        node: true,
    },
    extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'unused-imports', 'import', '@typescript-eslint', '@stylistic/eslint-plugin', 'eslint-plugin-react-hooks', 'jsx-a11y'],
    root: true,
    rules: {
        '@stylistic/arrow-parens': ['warn', 'always'],
        '@stylistic/indent': ['error', 4],
        '@stylistic/jsx-indent': [2, 4],
        '@stylistic/jsx-indent-props': [2, 4],
        '@stylistic/jsx-quotes': ['warn', 'prefer-double'],
        '@stylistic/member-delimiter-style': 'off',
        '@stylistic/no-multiple-empty-lines': ['error', {max: 1, maxEOF: 0}],
        '@stylistic/quotes': ['error', 'single'],
        '@stylistic/semi': ['error', 'always'],
        '@stylistic/comma-dangle': ['warn', {
            'arrays': 'always-multiline',
            'objects': 'always-multiline',
            'imports': 'always-multiline',
            'exports': 'never',
            'functions': 'never',
        }],

        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': 'error',

        'react/prop-types': 'off',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/self-closing-comp': 'warn',
        'react/jsx-sort-props': [
            'warn',
            {
                'callbacksLast': true,
                'shorthandFirst': true,
                'noSortAlphabetically': false,
                'reservedFirst': true,
            },
        ],

        'react-hooks/exhaustive-deps': 'warn',
        'react-hooks/rules-of-hooks': 'error',
        'jsx-a11y/click-events-have-key-events': 'warn',
        'jsx-a11y/interactive-supports-focus': 'warn',

        'no-unused-vars': 'off',
        'unused-imports/no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'warn',
        'no-console': ['error', {allow: ['warn', 'error', 'info']}],

        'import/order': [
            'error',
            {
                'groups': ['builtin', 'external', ['internal'], ['parent', 'sibling', 'index'], ['object', 'type']],
                'pathGroupsExcludedImportTypes': ['builtin'],
                // define next-ui group that will appear separately after other main externals
                'pathGroups': [
                    {pattern: '@nextui-org/{**}', group: 'external', position: 'after'},
                ],
                'newlines-between': 'always-and-inside-groups',
                'distinctGroup': false,
                'alphabetize': {order: 'asc', caseInsensitive: true},
            },
        ],

        'padding-line-between-statements': [
            'warn',
            {'blankLine': 'always', 'prev': '*', 'next': 'return'},
            {'blankLine': 'always', 'prev': ['const', 'let', 'var'], 'next': '*'},
            {
                'blankLine': 'any',
                'prev': ['const', 'let', 'var'],
                'next': ['const', 'let', 'var'],
            },
        ],
    },
    settings: {
        'react': {
            'version': 'detect',
        },
        'import/resolver': {
            'node': {
                'extensions': ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
};
