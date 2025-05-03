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

  let size = 14;
  let sizedown = 0.2;
  const pageWidth = doc.page.width;
  const pageMargins = doc.page.margins.left + doc.page.margins.right;
  let textWidthFull = pageWidth - pageMargins;
  let textWidthIntro = (pageWidth - pageMargins) * 0.4;
toto
  data.elements.forEach(element => {
    let title = element.title;
    let typeintro = element.typeintro;
    let typetext = element.typetext;
    let typeimage = element.typeimage;
    let nameimage = element.nameimage;
    doc.font('ARIALBD').fontSize(24).fillColor('#2196f3').text(title, {
      width: textWidthFull,
      align: 'center'
    });
    if (typeintro) {
      textWidth = textWidthIntro;
    } else {
      textWidth = textWidthFull;
    }
    doc.font('ARIAL').moveDown(sizedown);
    doc.font('ARIAL').moveDown(sizedown);
    if (typetext) {
      let content = sanitize(element.content);
      doc.font('ARIAL').fontSize(size).fillColor('black').text(content, { width: textWidth });
    }
    if (typeimage) {
      const imagePath = 'D:/chendra/02-applications/201-admin/01-data/admin/features/images/tutorials/' + nameimage;
      const { width, height } = doc.openImage(imagePath);
      const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
      const pageHeight = doc.page.height - doc.page.margins.top - doc.page.margins.bottom;
      let imgWidth = width;
      let imgHeight = height;
      if (imgWidth > pageWidth || imgHeight > pageHeight) {
        const scaleFactor = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
        imgWidth *= scaleFactor;
        imgHeight *= scaleFactor;
      }
      if (doc.y + imgHeight > doc.page.height - doc.page.margins.bottom) {
        doc.addPage({ size: 'A4' });
      }
      doc.image(imagePath, (doc.page.width - imgWidth) / 2, doc.y, {
        width: imgWidth,
        height: imgHeight
      });
      doc.moveDown(1);
    }
  });

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

  doc.end();
  stream.on('finish', () => {
    if (callback) callback();
  });
}

module.exports = {
  generatePDF,
};

