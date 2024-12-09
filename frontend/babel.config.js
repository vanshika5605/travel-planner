module.exports = {
    presets: [
      '@babel/preset-env', 
      ['@babel/preset-react', {
        runtime: 'automatic' // This enables the new JSX transform
      }]
    ],
  };