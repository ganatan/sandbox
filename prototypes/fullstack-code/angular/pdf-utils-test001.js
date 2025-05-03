const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const ARIAL = path.join(__dirname, 'ARIAL.TTF');
const ARIALBD = path.join(__dirname, 'ARIALBD.TTF');
const ARIALBI = path.join(__dirname, 'ARIALBI.TTF');
const ARIALI = path.join(__dirname, 'ARIALI.TTF');

function writeText(textWidth, size, sizedown, doc, text) {
  if (doc.y + 20 > doc.page.height - doc.page.margins.bottom) {
    doc.addPage({ size: 'A4' });
  }

  const regex = /<p>(.*?)<\/p>|(<br>)|<ul>(.*?)<\/ul>/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const beforeMatch = text.substring(lastIndex, match.index);
    if (beforeMatch) {
    }

    if (match[1]) {
      writeTextP(textWidth, size, sizedown, doc, match[1]);
    } else if (match[2]) {
      doc.font('ARIAL').moveDown(sizedown);
    } else if (match[3]) {
      writeTextUl(textWidth, size, sizedown, doc, match[3]);
    }

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
    doc.font('ARIAL').fontSize(size).fillColor('black').text(afterMatch, { width: textWidth });
  }
}

function writeTextP(textWidth, size, sizedown, doc, text) {
  if (doc.y + 20 > doc.page.height - doc.page.margins.bottom) {
    doc.addPage({ size: 'A4' });
  }

  const regex = /(<br>)|<strong>(.*?)<\/strong>|<i>(.*?)<\/i>/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const beforeMatch = text.substring(lastIndex, match.index);
    const nextMatch = text.substring(match.index + match[0].length).trim().startsWith('<br>');

    if (beforeMatch) {
      if (match[1]) {
        doc.font('ARIAL').fontSize(size).fillColor('black').text(beforeMatch, { width: textWidth });
        doc.font('ARIAL').moveDown(sizedown);
      } else {
        doc.font('ARIAL').fontSize(size).fillColor('black').text(beforeMatch, { width: textWidth, continued: true });
      }
    }

    if (match[1]) {
      doc.font('ARIAL').moveDown(sizedown);
    } else if (match[2]) {
      doc.font('ARIALBD').fontSize(size).fillColor('black').text(match[2], { width: textWidth, continued: !nextMatch });
    } else if (match[3]) {
      doc.font('ARIALI').fontSize(size).fillColor('black').text(match[3], { width: textWidth, continued: true });
    }

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
    doc.font('ARIAL').fontSize(size).fillColor('black').text(afterMatch, { width: textWidth });
    doc.font('ARIAL').moveDown(sizedown);
  }
}

function writeTextUl(textWidth, size, sizedown, doc, text) {
  if (doc.y + 20 > doc.page.height - doc.page.margins.bottom) {
    doc.addPage({ size: 'A4' });
  }
  const regex = /(<br>)|<strong>(.*?)<\/strong>|<i>(.*?)<\/i>|<li>(.*?)<\/li>/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {

    const beforeMatch = text.substring(lastIndex, match.index);
    if (beforeMatch) {
    }

    if (match[1]) {
    } else if (match[2]) {
    } else if (match[3]) {
    } else if (match[4]) {
      writeTextLi(textWidth, size, sizedown, doc, match[4]);
    }

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
  }
}

function writeTextLi(textWidth, size, sizedown, doc, text) {
  const bullet = '•';
  if (doc.y + 20 > doc.page.height - doc.page.margins.bottom) {
    doc.addPage({ size: 'A4' });
  }
  const regex = /(<br>)|<strong>(.*?)<\/strong>|<i>(.*?)<\/i>/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const beforeMatch = text.substring(lastIndex, match.index);
    if (beforeMatch) {
      if (match[1]) {
        doc.font('ARIAL').fontSize(size).fillColor('black').text(`${beforeMatch}`, { width: textWidth });
        doc.font('ARIAL').moveDown(sizedown);
      } else {
        doc.font('ARIAL').fontSize(size).fillColor('black').text(`${bullet} ${beforeMatch}`, { width: textWidth, continued: true });
      }
    }

    if (match[1]) {
      doc.moveDown(sizedown);
    } else if (match[2]) {
      doc.font('ARIALBD').fontSize(size).fillColor('black').text(match[2], { width: textWidth, continued: true });
    } else if (match[3]) {
      doc.font('ARIALI').fontSize(size).fillColor('black').text(match[3], { width: textWidth, continued: true });
    }

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
  }
}

function sanitize(content) {
  return content.replace(/&nbsp;/g, ' ');
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

  data.elements.forEach((element, index) => {
    let typeimage = element.typeimage;
    let nameimage = element.nameimage;
    let typetext = element.typetext;
    let content = element.content;

    let size = 14;
    let sizedown = 0.2;
    let text = '';

    const pageWidth = doc.page.width;
    const pageMargins = doc.page.margins.left + doc.page.margins.right;
    let textWidthFull = pageWidth - pageMargins;
    let textWidthIntro = (pageWidth - pageMargins) * 0.4;

    if (typetext) {
      writeText(textWidthFull, size, sizedown, doc, content);
    }

    // if (typetext) {
    //   text = 'Démarrer une Application Web avec Angular';
    //   doc.font('ARIAL').fontSize(size).fillColor('black').text(text).moveDown(sizedown);
    //   doc.font('ARIAL').fontSize(size).fillColor('black').text('Nous allons réaliser une Application Web.').moveDown(sizedown);
    // }


    // if (typeimage) {
    //   const imagePath = 'D:/chendra/02-applications/201-admin/01-data/admin/features/images/tutorials/' + nameimage;
    //   const image = doc.openImage(imagePath);
    //   let imgWidth = image.width;
    //   let imgHeight = image.height;
    //   doc.image(imagePath);
    //   doc.y += imgHeight;
    // }


    if (typeimage) {
      const imagePath = 'D:/chendra/02-applications/201-admin/01-data/admin/features/images/tutorials/' + nameimage;
      const image = doc.openImage(imagePath);
      const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
      const pageHeight = doc.page.height - doc.page.margins.top - doc.page.margins.bottom;
      let imgWidth = image.width;
      let imgHeight = image.height;
      let availableHeight = doc.page.height - doc.y - doc.page.margins.bottom;
      if (imgHeight > availableHeight) {
        doc.addPage({ size: 'A4' });
      }
      availableHeight = doc.page.height - doc.y - doc.page.margins.bottom;
      if (imgWidth > pageWidth || imgHeight > availableHeight) {
        const scaleFactor = Math.min(pageWidth / imgWidth, availableHeight / imgHeight);
        imgWidth *= scaleFactor;
        imgHeight *= scaleFactor;
      }
      doc.image(imagePath, (doc.page.width - imgWidth) / 2, doc.y, {
        width: imgWidth,
        height: imgHeight
      });
      doc.y += imgHeight + 10;
    }

  })


  doc.end();
  stream.on('finish', () => {
    if (callback) callback();
  });
}

// console.log('00000000001:' + doc.X);
// console.log('00000000001:' + doc.y);

// let size = 14;
// let sizedown = 0.2;
// let text = 'Démarrer une Application Web avec Angular';
// doc.font('ARIAL').fontSize(size).fillColor('black').text(text).moveDown(sizedown);
// doc.font('ARIAL').fontSize(size).fillColor('black').text('Nous allons réaliser une Application Web.').moveDown(sizedown);
// let imagePath = 'D:/chendra/02-applications/201-admin/01-data/admin/features/images/tutorials/anguarl-cli-installation.png';


// let size = 14;
// let sizedown = 0.2;
// let text = 'Démarrer une Application Web avec Angular';

// doc.font('ARIAL').fontSize(size).fillColor('black').text(text).moveDown(sizedown);
// doc.font('ARIAL').fontSize(size).fillColor('black').text('Nous allons réaliser une Application Web.').moveDown(sizedown);

// let imagePath = 'D:/chendra/02-applications/201-admin/01-data/admin/features/images/tutorials/anguarl-cli-installation.png';



// if (fs.existsSync(imagePath)) {
//   console.log('Position before image:', doc.y);
//   const image = doc.openImage(imagePath);
//   doc.image(imagePath, { fit: [400, 300], align: 'center' }).moveDown(3);
//   console.log('Position after image:', doc.y);
//   //  doc.y += imageHeight + 10; 
//   doc.y += 700;
// } else {
//   console.error(`Image not found: ${imagePath}`);
// }

// if (fs.existsSync(imagePath)) {
//   console.log('Position before image:', doc.y);
//   const imageHeight = 300; 
//   doc.image(imagePath, { fit: [400, imageHeight], align: 'center' });
//   doc.y += imageHeight + 10; 
//   console.log('Position after image:', doc.y);
// } else {
//   console.error(`Image not found: ${imagePath}`);
// }

// doc.font('ARIAL').fontSize(size).fillColor('black').text(text).moveDown(sizedown);
// doc.font('ARIAL').fontSize(size).fillColor('black').text('Fin du document.').moveDown(sizedown);







// if (fs.existsSync(imagePath)) {
//   console.log('Position before image:', doc.y);
//   const imageHeight = 300; 
//   doc.image(imagePath, { fit: [400, imageHeight], align: 'center' });
//   doc.y += imageHeight + 10; 
//   console.log('Position after image:', doc.y);
// } else {
//   console.error(`Image not found: ${imagePath}`);
// }

// doc.font('ARIAL').fontSize(size).fillColor('black').text(text);
// doc.moveDown(sizedown);
// doc.font('ARIAL').fontSize(size).fillColor('black').text('Fin du document.');
// doc.moveDown(sizedown);

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

//   console.log('00000000001:' + doc.X);
//   console.log('00000000001:' + doc.y);

//   let size = 14;
//   let sizedown = 0.2;
//   let text = 'Démarrer une Application Web avec Angular';

//   doc.font('ARIAL').fontSize(size).fillColor('black').text(text).moveDown(sizedown);
//   doc.font('ARIAL').fontSize(size).fillColor('black').text('Nous allons réaliser une Application Web.').moveDown(sizedown);

//   let imagePath = 'D:/chendra/02-applications/201-admin/01-data/admin/features/images/tutorials/anguarl-cli-installation.png';

//   if (fs.existsSync(imagePath)) {
//     console.log('Position before image:', doc.y);
//     doc.image(imagePath, { fit: [400, 300], align: 'center' }).moveDown(3);
//     console.log('Position after image:', doc.y);
//   } else {
//     console.error(`Image not found: ${imagePath}`);
//   }

//   doc.font('ARIAL').fontSize(size).fillColor('black').text(text).moveDown(sizedown);
//   doc.font('ARIAL').fontSize(size).fillColor('black').text('Fin du document.').moveDown(sizedown);

//   doc.end();
//   stream.on('finish', () => {
//     if (callback) callback();
//   });
// }

// let size = 14;
// let sizedown = 0.2;
// let text = 'Démarrer une Application Web avec Angular';
// doc.font('ARIAL').fontSize(size).fillColor('black').text(text);
// doc.moveDown(sizedown);
// doc.font('ARIAL').fontSize(size).fillColor('black').text('Nous allons réaliser une Application Web Dans ce tutoriel nous');
// doc.font('ARIAL').fontSize(size).fillColor('black').text('Nous allons réaliser une Application Web Dans ce tutoriel nous');
// doc.font('ARIAL').fontSize(size).fillColor('black').text(text);
// doc.moveDown(sizedown);

// let nameimage = 'anguarl-cli-installation.png';
// const imagePath = 'D:/chendra/02-applications/201-admin/01-data/admin/features/images/tutorials/' + nameimage;
// const image = doc.openImage(imagePath);
// console.log('00000000002:' + doc.X);
// console.log('00000000002:' + doc.y);
// doc.image(imagePath);

// doc.moveDown(sizedown);
// console.log('00000000003:' + doc.X);
// console.log('00000000003:' + doc.y);

// doc.font('ARIAL').fontSize(size).fillColor('black').text(text);
// doc.moveDown(sizedown);
// doc.font('ARIAL').fontSize(size).fillColor('black').text('Nous allons réaliser une Application Web Dans ce tutoriel nous');
// doc.font('ARIAL').fontSize(size).fillColor('black').text('Nous allons réaliser une Application Web Dans ce tutoriel nous');
// doc.font('ARIAL').fontSize(size).fillColor('black').text(text);
// doc.moveDown(sizedown);

// console.log('00000000003:' + doc.X);
// console.log('00000000003:' + doc.y);




// let sizedown = 0.2;
// const pageWidth = doc.page.width;
// const pageMargins = doc.page.margins.left + doc.page.margins.right;
// let textWidthFull = pageWidth - pageMargins;
// let textWidthIntro = (pageWidth - pageMargins) * 0.4;

// data.elements.forEach((element, index) => {
//   let typeimage = element.typeimage;
//   let nameimage = element.nameimage;
//   if (typeimage) {
//     const imagePath = 'D:/chendra/02-applications/201-admin/01-data/admin/features/images/tutorials/' + nameimage;
//     const image = doc.openImage(imagePath);
//     const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
//     const pageHeight = doc.page.height - doc.page.margins.top - doc.page.margins.bottom;
//     let imgWidth = image.width;
//     let imgHeight = image.height;
//     let availableHeight = doc.page.height - doc.y - doc.page.margins.bottom;
//     if (imgHeight > availableHeight) {
//       doc.addPage({ size: 'A4' });
//     }
//     availableHeight = doc.page.height - doc.y - doc.page.margins.bottom;
//     if (imgWidth > pageWidth || imgHeight > availableHeight) {
//       const scaleFactor = Math.min(pageWidth / imgWidth, availableHeight / imgHeight);
//       imgWidth *= scaleFactor;
//       imgHeight *= scaleFactor;
//     }
//     doc.image(imagePath, (doc.page.width - imgWidth) / 2, doc.y, {
//       width: imgWidth,
//       height: imgHeight
//     });
//     doc.y += imgHeight + 10;
//   }

// });



// data.elements.forEach((element, index) => {
//   let typeimage = element.typeimage;
//   let nameimage = element.nameimage;
//   if (typeimage) {
//     const imagePath = 'D:/chendra/02-applications/201-admin/01-data/admin/features/images/tutorials/' + nameimage;
//     const { width, height } = doc.openImage(imagePath);
//     const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
//     const pageHeight = doc.page.height - doc.page.margins.top - doc.page.margins.bottom;
//     let imgWidth = width;
//     let imgHeight = height;
//     if (imgWidth > pageWidth || imgHeight > pageHeight) {
//       const scaleFactor = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
//       imgWidth *= scaleFactor;
//       imgHeight *= scaleFactor;
//     }
//     if (doc.y + imgHeight > doc.page.height - doc.page.margins.bottom) {
//       doc.addPage({ size: 'A4' });
//     }
//     doc.image(imagePath, (doc.page.width - imgWidth) / 2, doc.y, {
//       width: imgWidth,
//       height: imgHeight
//     });
//     doc.moveDown(1);
//   }
// });

// let title = element.title;
// let typeintro = element.typeintro;
// let typetext = element.typetext;

// let title = 'line' + index;
// doc.font('ARIALBD').fontSize(24).fillColor('#2196f3').text(title, {
//   width: textWidthFull,
//   align: 'center'
// });

// doc.font('ARIALBD').fontSize(24).fillColor('#2196f3').text(title, {
//   width: textWidthFull,
//   align: 'center'
// });
// if (typeintro) {
//   textWidth = textWidthIntro;
// } else {
//   textWidth = textWidthFull;
// }
// doc.font('ARIAL').moveDown(sizedown);
// doc.font('ARIAL').moveDown(sizedown);
// if (typetext) {
//   let content = sanitize(element.content);
//   doc.font('ARIAL').fontSize(size).fillColor('black').text(content, { width: textWidth });
// }



// console.log('00000000001:' + JSON.stringify(element));
// writeText(textWidth, size, sizedown, doc, content);

// let size = 14;
// let sizedown = 0.2;
// const pageWidth = doc.page.width;
// const pageMargins = doc.page.margins.left + doc.page.margins.right;
// let textWidthFull = pageWidth - pageMargins;
// let textWidthIntro = (pageWidth - pageMargins) * 0.4;
// let text = 'Démarrer une Application Web avec Angular';
// doc.font('ARIAL').fontSize(size).fillColor('black').text(text, { width: textWidthFull, align: 'center' });
// doc.moveDown(sizedown);
// doc.font('ARIAL').fontSize(size).fillColor('black').text('Nous allons réaliser une Application Web Dans ce tutoriel nous', { width: textWidthIntro });
// doc.font('ARIAL').fontSize(size).fillColor('black').text('Nous allons réaliser une Application Web Dans ce tutoriel nous', { width: textWidthIntro });
// doc.font('ARIAL').fontSize(size).fillColor('black').text(text, { width: textWidthFull, align: 'center' });
// doc.moveDown(sizedown);
// doc.font('ARIAL').fontSize(size).fillColor('black').text('Nous allons réaliser une Application Web Dans ce tutoriel nous', { width: textWidthFull });
// doc.font('ARIAL').fontSize(size).fillColor('black').text('Nous allons réaliser une Application Web Dans ce tutoriel nous', { width: textWidthFull });
// doc.font('ARIAL').fontSize(size).fillColor('black').text(text, { width: textWidthFull, align: 'center' });
// doc.moveDown(sizedown);

// let text =
//   '<p>toto<br>toto <strong>toto </strong> toto toto</p><p><strong>Popular Frameworks</strong> :</p>' +
//   '<ul><li>The Spring Framework for Java</li><li>The Django Framework for Python</li></ul>';
//   writeText(size, sizedown, doc, text);
// doc.moveDown(sizedown);

// doc.font('ARIAL').fontSize(size).fillColor('black').text('Nous allons réaliser une Application Web Dans ce tutoriel nous', { width: textWidth });
// doc.moveDown(sizedown);
// doc.font('ARIAL').fontSize(size).fillColor('black').text('toto ', { width: textWidth, continued: true });
// doc.font('ARIALBD').fontSize(size).fillColor('black').text('toto ', { width: textWidth, continued: true });
// doc.font('ARIAL').fontSize(size).fillColor('black').text('toto toto');
// doc.moveDown(sizedown);
// const bullet = '•';
// doc.font('ARIALBD').fontSize(size).fillColor('black').text('Popular Frameworks:', { width: textWidth });
// doc.moveDown(sizedown);
// doc.font('ARIAL').fontSize(size).fillColor('black').text(`${bullet} The Spring Framework for Java`, { width: textWidth });
// doc.moveDown(sizedown);
// doc.font('ARIAL').fontSize(size).fillColor('black').text(`${bullet} The Django Framework for Python`, { width: textWidth });
// doc.moveDown(sizedown);

// let text = `<p>Nous allons réaliser une&nbsp;<strong>Application Web.</strong><br><br>Dans ce</p>`;
// let text = `
// <p>Nous allons réaliser une&nbsp;<strong>Application Web.</strong><br><br>Dans ce tutoriel nous utiliserons&nbsp;<strong>Angular version 19.1.3</strong><br><br>Pour commencer notre application nous partirons de rien (<strong>from scratch</strong>) en nous efforçant de suivre les meilleures pratiques (<strong>best practices)&nbsp;</strong>d'Angular.<br><br></p>
// <ul><li>Angular a été créé par&nbsp;<strong>Google</strong>.<br><br></li><li>Angular est&nbsp;<strong>open source</strong>, son utilisation est donc gratuite.<br><br></li><li>Angular utilise&nbsp;<strong>Typescript</strong>.<br><br></li><li>Angular est un&nbsp;<strong>framework javascript Frontend</strong>.</li></ul>
// `;
// let content = sanitize(text);
// writeText(size, sizedown, doc, content);

// let text = `
// <p>Nous allons réaliser une&nbsp;<strong>Application Web.</strong><br>Dans ce tutoriel nous
// utiliserons&nbsp;<strong>Angular version 19.1.3<br></strong>Dans ce tutoriel nous utiliserons&nbsp;<strong>Angular
//   version 19.1.3</strong><br><br>Pour commencer notre application nous partirons de rien (<strong>from
//   scratch</strong>) en nous efforçant de suivre les meilleures pratiques (<strong>best
//   practices)&nbsp;</strong>d'Angular.<br><br>Liste des informations<br><br></p>
//   `;
// text = `<p>Nous allons réaliser une&nbsp;<strong>Application Web.</strong>
// Dans ce tutoriel nous utiliserons&nbsp;<strong>Angular version 19.1.3<br></strong></p>
// `;
// let content = sanitize(text);
// writeText(size, sizedown, doc, content);

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



module.exports = {
  generatePDF,
};

