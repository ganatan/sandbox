const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const ARIAL = path.join(__dirname, 'ARIAL.TTF');
const ARIALBD = path.join(__dirname, 'ARIALBD.TTF');
const ARIALBI = path.join(__dirname, 'ARIALBI.TTF');
const ARIALI = path.join(__dirname, 'ARIALI.TTF');

function writeText(size, doc, text) {
  const bullet = '•';
  if (doc.y + 20 > doc.page.height - doc.page.margins.bottom) {
    doc.addPage({ size: 'A4' });
  }

  const regex = /(<br>)|<p>(.*?)<\/p>|<strong>(.*?)<\/strong>|<i>(.*?)<\/i>|<ul>(.*?)<\/ul>/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const beforeMatch = text.substring(lastIndex, match.index);
    if (beforeMatch) {
      if (match[1]) {
        doc.font('ARIAL').fontSize(size).fillColor('black').text(beforeMatch);
        doc.font('ARIAL').moveDown(0.2);
      } else {
        doc.font('ARIAL').fontSize(size).fillColor('black').text(beforeMatch, { continued: true });
      }
    }

    if (match[1]) {
    } else if (match[3]) {
      doc.font('ARIALBD').fontSize(size).fillColor('black').text(match[3], { continued: true });
    } else if (match[4]) {
      doc.font('ARIALI').fontSize(size).fillColor('black').text(match[4], { continued: true });
    } else if (match[5]) {
      writeTextUl(size, doc, match[5]);
    }

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
    doc.font('ARIAL').fontSize(size).fillColor('black').text(afterMatch);
  }
}

function writeTextP(size, doc, text) {
  const bullet = '•';
  if (doc.y + 20 > doc.page.height - doc.page.margins.bottom) {
    doc.addPage({ size: 'A4' });
  }

  const regex = /(<br>)|<p>(.*?)<\/p>|<strong>(.*?)<\/strong>|<i>(.*?)<\/i>|<ul>(.*?)<\/ul>/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const beforeMatch = text.substring(lastIndex, match.index);
    if (beforeMatch) {
      if (match[1]) {
        doc.font('ARIAL').fontSize(size).fillColor('black').text(beforeMatch);
        doc.font('ARIAL').moveDown(0.2);
      } else {
        doc.font('ARIAL').fontSize(size).fillColor('black').text(beforeMatch, { continued: true });
      }
    }

    if (match[1]) {
    } else if (match[3]) {
      doc.font('ARIALBD').fontSize(size).fillColor('black').text(match[3], { continued: true });
    } else if (match[4]) {
      doc.font('ARIALI').fontSize(size).fillColor('black').text(match[4], { continued: true });
    } else if (match[5]) {
      writeTextUl(size, doc, match[5]);
    }

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
    doc.font('ARIAL').fontSize(size).fillColor('black').text(afterMatch);
  }
}

function writeTextUl(size, doc, text) {
  const bullet = '•';
  if (doc.y + 20 > doc.page.height - doc.page.margins.bottom) {
    doc.addPage({ size: 'A4' });
  }

  const regex = /(<br>)|<strong>(.*?)<\/strong>|<i>(.*?)<\/i>|<li>(.*?)<\/li>/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {

    const beforeMatch = text.substring(lastIndex, match.index);
    if (beforeMatch) {
      if (match[1]) {
        doc.font('ARIAL').fontSize(size).fillColor('black').text(beforeMatch);
        doc.font('ARIAL').moveDown(0.2);
      } else {
        doc.font('ARIAL').fontSize(size).fillColor('black').text(beforeMatch, { continued: true });
      }
    }

    if (match[3]) {
    } else if (match[4]) {
      doc.font('ARIAL').fontSize(size).fillColor('black').text(`${bullet} ${match[4]}`);
      doc.moveDown(0.2);
    }

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
    // doc.font('ARIAL').fontSize(size).fillColor('black').text(afterMatch);
  }
}

function generatePDF(data, outputPath, callback) {
  if (!fs.existsSync(path.dirname(outputPath))) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  }
  const doc = new PDFDocument({ autoFirstPage: false });
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  doc.registerFont('ARIAL', ARIAL);
  doc.registerFont('ARIALBD', ARIALBD);
  doc.registerFont('ARIALBI', ARIALBI);
  doc.registerFont('ARIALI', ARIALI);

  doc.addPage({ size: 'A4' });
  let size = 14;

  data.elements.forEach(element => {
    if (element.typetext && element.content) {
      console.log('00000000001:' + JSON.stringify(element));
      writeText(size, doc, element.content);
    }
  });

  doc.moveDown();

  // let text = `
  //   <strong>Popular Framework</strong>
  //   <ul><li>Le Framework Spring pour Java</li><li>le Framework Django pour Python</li></ul>`;
  // writeText(size, doc, text);

  // text = `Nous allons réaliser une <br><strong>Application Web</strong>.<br>Dans ce tutoriel <i>nous utiliserons</i> Angular version 19.1.3`;
  // writeText(size, doc, text);

  // doc.moveDown();

  // doc.font('ARIAL').fontSize(size).fillColor('black').text('Nous allons réaliser une ');
  // doc.font('ARIAL').moveDown(0.2);
  // doc.font('ARIALBD').fontSize(size).fillColor('black').text('Application Web.');
  // doc.font('ARIAL').moveDown(0.2);
  // doc.font('ARIAL').fontSize(size).fillColor('black').text('Dans ce tutoriel ', { continued: true });
  // doc.font('ARIALI').fontSize(size).fillColor('black').text('nous utiliserons ', { continued: true });
  // doc.font('ARIAL').fontSize(size).fillColor('black').text('Angular version 19.1.3');

  // const bullet = '•';

  // doc.moveDown(0.5);
  // doc.font('ARIALBD').fontSize(size).fillColor('black').text('Popular Frameworks:');
  // doc.moveDown(0.2);

  // doc.font('ARIAL').fontSize(size).fillColor('black').text(`${bullet} The Spring Framework for Java`);
  // doc.moveDown(0.2);
  // doc.font('ARIAL').fontSize(size).fillColor('black').text(`${bullet} The Django Framework for Python`);
  // doc.moveDown(0.2);
  // doc.font('ARIAL').fontSize(size).fillColor('black').text(`${bullet} The Laravel or Symfony Frameworks for PHP`);

  doc.end();
  stream.on('finish', () => {
    if (callback) callback();
  });
}

module.exports = {
  generatePDF,
};





// console.log('00000000001:' + JSON.stringify(data));
// let text = 'Nous allons réaliser une <strong>Application Web</strong>.';
// writeText(doc, text);
// text = 'Dans ce tutoriel nous utiliserons <i>Angular version 19.1.3</i>.';
// writeText(doc, text);
// text = 'Le texte peut aussi être <u>souligné</u>.';
// writeText(doc, text);

// console.log('00000000001:' + JSON.stringify(data));
// data.elements.forEach(element => {
//   if (element.typetext && element.content) {
//     writeText(doc, element.content);
//   }
// });




// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const path = require('path');

// const ARIAL = path.join(__dirname, 'ARIAL.TTF');
// const ARIALBD = path.join(__dirname, 'ARIALBD.TTF');
// const ARIALBI = path.join(__dirname, 'ARIALBI.TTF');
// const ARIALI = path.join(__dirname, 'ARIALI.TTF');

// function writeText(doc, text) {
//   let size = 12;
//   if (doc.y + 20 > doc.page.height - doc.page.margins.bottom) {
//     doc.addPage({ size: 'A4' });
//   }

//   const strongRegex = /<strong>(.*?)<\/strong>/g;
//   let lastIndex = 0;
//   let match;

//   while ((match = strongRegex.exec(text)) !== null) {
//     const beforeStrong = text.substring(lastIndex, match.index);
//     if (beforeStrong) {
//       doc.font('ARIAL').fontSize(size).fillColor('black').text(beforeStrong, { continued: true });
//     }

//     doc.font('ARIALBD').fontSize(size).fillColor('black').text(match[1]);

//     lastIndex = strongRegex.lastIndex;
//   }

//   const afterStrong = text.substring(lastIndex);
//   if (afterStrong) {
//     doc.font('ARIAL').fontSize(size).fillColor('black').text(afterStrong);
//   }

// }


// function generatePDF(data, outputPath, callback) {
//   if (!fs.existsSync(path.dirname(outputPath))) {
//     fs.mkdirSync(path.dirname(outputPath), { recursive: true });
//   }
//   const doc = new PDFDocument({ autoFirstPage: false });
//   const stream = fs.createWriteStream(outputPath);
//   doc.pipe(stream);

//   doc.registerFont('ARIAL', ARIAL);
//   doc.registerFont('ARIALBD', ARIALBD);
//   doc.registerFont('ARIALBI', ARIALBI);
//   doc.registerFont('ARIALI', ARIALI);

//   doc.addPage({ size: 'A4' });

//   doc.font('ARIAL').fontSize(12).fillColor('black').text('Nous allons réaliser une ', { continued: true });
//   doc.font('ARIALBD').fontSize(12).fillColor('black').text('Application Web.');
//   doc.font('ARIAL').fontSize(12).fillColor('black').text('Dans ce tutoriel nous utiliserons Angular version 19.1.3');

//   doc.font('ARIAL').fontSize(12).fillColor('black').text('Nous allons réaliser une ', { continued: true });
//   doc.font('ARIALI').fontSize(12).fillColor('black').text('Application Web.');

//   let text = 'Nous allons réaliser une <strong>Application Web.</strong>';
//   writeText(doc, text);
//   text = 'Dans ce tutoriel nous utiliserons Angular version 19.1.3';
//   writeText(doc, text);

//   text = 'Nous allons réaliser une <i>Application Web.</i>';
//   writeText(doc, text);
//   text = 'Dans ce tutoriel nous utiliserons Angular version 19.1.3';
//   writeText(doc, text);

//   doc.end();
//   stream.on('finish', () => {
//     if (callback) callback();
//   });
// }

// module.exports = {
//   generatePDF,
// };





// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const path = require('path');

// const ARIAL = path.join(__dirname, 'ARIAL.TTF');
// const ARIALBD = path.join(__dirname, 'ARIALBD.TTF');
// const ARIALBI = path.join(__dirname, 'ARIALBI.TTF');
// const ARIALI = path.join(__dirname, 'ARIALI.TTF');

// function writeText(size, doc, text) {
//   if (doc.y + 20 > doc.page.height - doc.page.margins.bottom) {
//     doc.addPage({ size: 'A4' });
//   }

//   const regex = /(<br>)|<p>(.*?)<\/p>|<strong>(.*?)<\/strong>|<i>(.*?)<\/i>/g;
//   let lastIndex = 0;
//   let match;

//   while ((match = regex.exec(text)) !== null) {
//     const beforeMatch = text.substring(lastIndex, match.index);
//     if (beforeMatch) {
//       if (match[1]) {
//         doc.font('ARIAL').fontSize(size).fillColor('black').text(beforeMatch);
//         doc.font('ARIAL').moveDown(0.2);
//       } else {
//         doc.font('ARIAL').fontSize(size).fillColor('black').text(beforeMatch, { continued: true });
//       }
//     }

//     if (match[1]) {
//     } else if (match[3]) {
//       doc.font('ARIALBD').fontSize(size).fillColor('black').text(match[3], { continued: true });
//     } else if (match[4]) {
//       doc.font('ARIALI').fontSize(size).fillColor('black').text(match[4], { continued: true });
//     }

//     lastIndex = regex.lastIndex;
//   }

//   const afterMatch = text.substring(lastIndex);
//   if (afterMatch) {
//     doc.font('ARIAL').fontSize(size).fillColor('black').text(afterMatch);
//   }
// }

// function generatePDF(data, outputPath, callback) {
//   if (!fs.existsSync(path.dirname(outputPath))) {
//     fs.mkdirSync(path.dirname(outputPath), { recursive: true });
//   }
//   const doc = new PDFDocument({ autoFirstPage: false });
//   const stream = fs.createWriteStream(outputPath);
//   doc.pipe(stream);

//   doc.registerFont('ARIAL', ARIAL);
//   doc.registerFont('ARIALBD', ARIALBD);
//   doc.registerFont('ARIALBI', ARIALBI);
//   doc.registerFont('ARIALI', ARIALI);

//   doc.addPage({ size: 'A4' });
//   let size = 14;

//   data.elements.forEach(element => {
//     if (element.typetext && element.content) {
//       writeText(size, doc, element.content);
//     }
//   });

//   doc.moveDown();

//   let text = 'Nous allons réaliser une <br><strong>Application Web</strong>.<br>Dans ce tutoriel <i>nous utiliserons</i> Angular version 19.1.3';
//   writeText(size, doc, text);

//   doc.moveDown();

//   doc.font('ARIAL').fontSize(size).fillColor('black').text('Nous allons réaliser une ');
//   doc.font('ARIAL').moveDown(0.2);
//   doc.font('ARIALBD').fontSize(size).fillColor('black').text('Application Web.');
//   doc.font('ARIAL').moveDown(0.2);
//   doc.font('ARIAL').fontSize(size).fillColor('black').text('Dans ce tutoriel ', { continued: true });
//   doc.font('ARIALI').fontSize(size).fillColor('black').text('nous utiliserons ', { continued: true });
//   doc.font('ARIAL').fontSize(size).fillColor('black').text('Angular version 19.1.3');

//   const bullet = '•';

//   doc.moveDown(0.5);
//   doc.font('ARIALBD').fontSize(size).fillColor('black').text('Popular Frameworks:');
//   doc.moveDown(0.2);

//   doc.font('ARIAL').fontSize(size).fillColor('black').text(`${bullet} The Spring Framework for Java`);
//   doc.moveDown(0.2);
//   doc.font('ARIAL').fontSize(size).fillColor('black').text(`${bullet} The Django Framework for Python`);
//   doc.moveDown(0.2);
//   doc.font('ARIAL').fontSize(size).fillColor('black').text(`${bullet} The Laravel or Symfony Frameworks for PHP`);

//   doc.end();
//   stream.on('finish', () => {
//     if (callback) callback();
//   });
// }

// module.exports = {
//   generatePDF,
// };





// console.log('00000000001:' + JSON.stringify(data));
// let text = 'Nous allons réaliser une <strong>Application Web</strong>.';
// writeText(doc, text);
// text = 'Dans ce tutoriel nous utiliserons <i>Angular version 19.1.3</i>.';
// writeText(doc, text);
// text = 'Le texte peut aussi être <u>souligné</u>.';
// writeText(doc, text);

// console.log('00000000001:' + JSON.stringify(data));
// data.elements.forEach(element => {
//   if (element.typetext && element.content) {
//     writeText(doc, element.content);
//   }
// });




// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const path = require('path');

// const ARIAL = path.join(__dirname, 'ARIAL.TTF');
// const ARIALBD = path.join(__dirname, 'ARIALBD.TTF');
// const ARIALBI = path.join(__dirname, 'ARIALBI.TTF');
// const ARIALI = path.join(__dirname, 'ARIALI.TTF');

// function writeText(doc, text) {
//   let size = 12;
//   if (doc.y + 20 > doc.page.height - doc.page.margins.bottom) {
//     doc.addPage({ size: 'A4' });
//   }

//   const strongRegex = /<strong>(.*?)<\/strong>/g;
//   let lastIndex = 0;
//   let match;

//   while ((match = strongRegex.exec(text)) !== null) {
//     const beforeStrong = text.substring(lastIndex, match.index);
//     if (beforeStrong) {
//       doc.font('ARIAL').fontSize(size).fillColor('black').text(beforeStrong, { continued: true });
//     }

//     doc.font('ARIALBD').fontSize(size).fillColor('black').text(match[1]);

//     lastIndex = strongRegex.lastIndex;
//   }

//   const afterStrong = text.substring(lastIndex);
//   if (afterStrong) {
//     doc.font('ARIAL').fontSize(size).fillColor('black').text(afterStrong);
//   }

// }


// function generatePDF(data, outputPath, callback) {
//   if (!fs.existsSync(path.dirname(outputPath))) {
//     fs.mkdirSync(path.dirname(outputPath), { recursive: true });
//   }
//   const doc = new PDFDocument({ autoFirstPage: false });
//   const stream = fs.createWriteStream(outputPath);
//   doc.pipe(stream);

//   doc.registerFont('ARIAL', ARIAL);
//   doc.registerFont('ARIALBD', ARIALBD);
//   doc.registerFont('ARIALBI', ARIALBI);
//   doc.registerFont('ARIALI', ARIALI);

//   doc.addPage({ size: 'A4' });

//   doc.font('ARIAL').fontSize(12).fillColor('black').text('Nous allons réaliser une ', { continued: true });
//   doc.font('ARIALBD').fontSize(12).fillColor('black').text('Application Web.');
//   doc.font('ARIAL').fontSize(12).fillColor('black').text('Dans ce tutoriel nous utiliserons Angular version 19.1.3');

//   doc.font('ARIAL').fontSize(12).fillColor('black').text('Nous allons réaliser une ', { continued: true });
//   doc.font('ARIALI').fontSize(12).fillColor('black').text('Application Web.');

//   let text = 'Nous allons réaliser une <strong>Application Web.</strong>';
//   writeText(doc, text);
//   text = 'Dans ce tutoriel nous utiliserons Angular version 19.1.3';
//   writeText(doc, text);

//   text = 'Nous allons réaliser une <i>Application Web.</i>';
//   writeText(doc, text);
//   text = 'Dans ce tutoriel nous utiliserons Angular version 19.1.3';
//   writeText(doc, text);

//   doc.end();
//   stream.on('finish', () => {
//     if (callback) callback();
//   });
// }

// module.exports = {
//   generatePDF,
// };


