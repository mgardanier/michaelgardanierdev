const fs = require('fs');
const path = require('path');

// Directory containing the posts
const postsDirectory = path.join(__dirname, '../posts');
const targetFile = path.join(__dirname, '../scripts/markdownLoader.js'); // Specify the target JS file

// Read the files in the posts directory
fs.readdir(postsDirectory, (err, files) => {
    if (err) {
        console.error('Error reading posts directory:', err);
        process.exit(1);
    }

    // Filter out files that are not markdown
    const postFilenames = files.filter(file => file.endsWith('.md'));

    // Read the target JS file
    fs.readFile(targetFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JS file:', err);
            process.exit(1);
        }

        // Replace the method signature with the updated list of filenames
        const updatedData = data.replace(
            /init\(\s*postFilenames\s*=\s*\[.*?\]\)/,
            `init(postFilenames = ${JSON.stringify(postFilenames)})`
        );

        // Write the updated data back to the file
        fs.writeFile(targetFile, updatedData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing to JS file:', err);
                process.exit(1);
            }

            console.log('Method signature updated with post filenames.');
        });
    });
});
