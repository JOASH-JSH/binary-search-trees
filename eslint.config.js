import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
    { languageOptions: { globals: globals.node } },
    pluginJs.configs.recommended,
    {
        rules: {
            semi: 'error',
            eqeqeq: 'error',
            indent: ['warn', 4],
            qoutes: ['warn', 'single', { allowTemplateLiteral: true }],
            curly: 'error'
        }
    },
    eslintConfigPrettier
];
