const fs = require('fs');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = require('../config/openapiRegistry');

/**
 * Script to export OpenAPI specification to a JSON file.
 * Usage: node src/scripts/exportOpenApi.js
 */
const exportOpenApi = () => {
  try {
    console.log('Generating OpenAPI specification...');
    
    // Generate the specification using the same logic as in app.js
    const openapiSpecification = swaggerJsdoc(swaggerOptions);

    // Ensure the documentation directory exists
    const docDir = path.join(__dirname, '../../documentation');
    if (!fs.existsSync(docDir)) {
      fs.mkdirSync(docDir, { recursive: true });
    }

    // Define the output path
    const outputPath = path.join(docDir, 'openapi.json');

    // Write the specification to the file
    fs.writeFileSync(outputPath, JSON.stringify(openapiSpecification, null, 2), 'utf8');

    console.log(`Successfully exported OpenAPI specification to: ${outputPath}`);
  } catch (error) {
    console.error('Error exporting OpenAPI specification:', error);
    process.exit(1);
  }
};

exportOpenApi();
