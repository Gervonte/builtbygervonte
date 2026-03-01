import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import prettierConfig from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';

export default [
  ...nextCoreWebVitals,
  {
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      // Suppress false positive warnings
      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'import/no-anonymous-default-export': 'off',
    },
  },
  prettierConfig,
];
