import jseslint from '@eslint/js';
import { baseConfigs } from '@ur-apps/common/eslint';
import tseslint from 'typescript-eslint';

export default tseslint.config(jseslint.configs.recommended, tseslint.configs.recommended, baseConfigs, {
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  },
});
