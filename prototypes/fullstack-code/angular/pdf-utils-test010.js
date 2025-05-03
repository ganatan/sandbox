const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const ARIAL = path.join(__dirname, 'ARIAL.TTF');
const ARIALBD = path.join(__dirname, 'ARIALBD.TTF');
const ARIALBI = path.join(__dirname, 'ARIALBI.TTF');
const ARIALI = path.join(__dirname, 'ARIALI.TTF');

const PDF_TOP = 40;
const PDF_BOTTOM = 40;
const PDF_LEFT = 30;
const PDF_RIGHT = 30;
const PDF_WIDTH = 1;

const SIZE_DOWN_BR = 1;

const INTRO_TOP = 40;
const INTRO_BOTTOM = 40;
const INTRO_LEFT = 40;
const INTRO_RIGHT = 30;
const INTRO_WIDTH = 0.56;

const ITEM_TOP = 40;
const ITEM_BOTTOM = 40;
const ITEM_LEFT = 50;
const ITEM_RIGHT = 30;
const ITEM_WIDTH = 0.80;

function writeText(doc, textLeft, textWidth, textSize, textColor, text) {
  if (doc.y + 20 > doc.page.height - doc.page.margins.bottom) {
    doc.addPage({
      size: 'A4', margins: {
        top: PDF_TOP,
        bottom: PDF_BOTTOM,
        left: PDF_LEFT,
        right: PDF_RIGHT,
      }
    });
  }

  const regex = /<p>(.*?)<\/p>|(<br>)|<ul>(.*?)<\/ul>/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const beforeMatch = text.substring(lastIndex, match.index);
    if (beforeMatch) {
    }

    if (match[1]) {
      writeTextP(doc, textLeft, textWidth, textSize, textColor, match[1]);
    } else if (match[2]) {
      doc.font('ARIAL').moveDown(1);
    } else if (match[3]) {
      writeTextUl(doc, textLeft, textWidth, textSize, textColor, match[3]);
    }

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
    doc.font('ARIAL').fontSize(textSize).fillColor(textColor)
      .text(afterMatch,
        textLeft, doc.y, { width: textWidth, });
  }
}

function writeTextP(doc, textLeft, textWidth, textSize, textColor, text) {
  if (doc.y + 20 > doc.page.height - doc.page.margins.bottom) {
    doc.addPage({
      size: 'A4', margins: {
        top: PDF_TOP,
        bottom: PDF_BOTTOM,
        left: PDF_LEFT,
        right: PDF_RIGHT,
      }
    });
  }

  const regex = /(<br>)|<strong>(.*?)<\/strong>|<em>(.*?)<\/em>/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const beforeMatch = text.substring(lastIndex, match.index);
    const nextMatch = text.substring(match.index + match[0].length).trim().startsWith('<br>');

    if (beforeMatch) {
      if (match[1]) {
        doc.font('ARIAL').fontSize(textSize).fillColor(textColor)
          .text(beforeMatch,
            textLeft, doc.y, { width: textWidth, });
      } else {
        doc.font('ARIAL').fontSize(textSize).fillColor(textColor)
          .text(beforeMatch,
            textLeft, doc.y, { width: textWidth, continued: true });
      }
    }

    if (match[1]) {
      doc.font('ARIAL').moveDown(1);
    } else if (match[2]) {
      doc.font('ARIALBD').fontSize(textSize).fillColor(textColor)
        .text(match[2],
          textLeft, doc.y, { width: textWidth, continued: !nextMatch });
    } else if (match[3]) {
      doc.font('ARIALI').fontSize(textSize).fillColor(textColor)
        .text(match[3],
          textLeft, doc.y, { width: textWidth, continued: true });
    }

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
    doc.font('ARIAL').fontSize(textSize).fillColor(textColor)
      .text(afterMatch,
        textLeft, doc.y, { width: textWidth, });
  }
}

function writeTextUl(doc, textLeft, textWidth, textSize, textColor, text) {
  if (doc.y + 20 > doc.page.height - doc.page.margins.bottom) {
    doc.addPage({
      size: 'A4', margins: {
        top: PDF_TOP,
        bottom: PDF_BOTTOM,
        left: PDF_LEFT,
        right: PDF_RIGHT,
      }
    });
  }
  const regex = /(<br>)|<strong>(.*?)<\/strong>|<em>(.*?)<\/em>|<li>(.*?)<\/li>/g;
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
      writeTextLi(doc, textLeft, textWidth, textSize, textColor, match[4]);
    }

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
  }
}

function writeTextLi(doc, textLeft, textWidth, textSize, textColor, text) {
  const bullet = '•';
  if (doc.y + 20 > doc.page.height - doc.page.margins.bottom) {
    doc.addPage({
      size: 'A4', margins: {
        top: PDF_TOP,
        bottom: PDF_BOTTOM,
        left: PDF_LEFT,
        right: PDF_RIGHT,
      }
    });
  }
  const regex = /(<br>)|<strong>(.*?)<\/strong>|<em>(.*?)<\/em>/g;
  let lastIndex = 0;
  let match;
  let index = 0;
  let bulletLi = '';

  while ((match = regex.exec(text)) !== null) {
    bulletLi = ' ';
    if (index === 0) {
      bulletLi = bullet;
    }
    const beforeMatch = text.substring(lastIndex, match.index);
    const nextMatch = text.substring(match.index + match[0].length).trim().startsWith('<br>');
    if (beforeMatch) {
      if (match[1]) {
        doc.font('ARIAL').fontSize(textSize).fillColor(textColor)
          .text(`${bulletLi} ${beforeMatch}`,
            textLeft, doc.y, { width: textWidth, });
      } else {
        doc.font('ARIAL').fontSize(textSize).fillColor(textColor)
          .text(`${bulletLi} ${beforeMatch}`,
            textLeft, doc.y, { width: textWidth, continued: true });
      }
    }

    if (match[1]) {
      index += 1;
      doc.font('ARIAL').moveDown(0.1);
    } else if (match[2]) {
      index += 1;
      doc.font('ARIALBD').fontSize(textSize).fillColor(textColor)
        .text(`${bulletLi} ${match[2]}`,
          textLeft, doc.y, { width: textWidth, continued: !nextMatch });
    } else if (match[3]) {
      index += 1;
      doc.font('ARIALI').fontSize(textSize).fillColor(textColor)
        .text(`${bulletLi} ${match[3]}`,
          textLeft, doc.y, { width: textWidth, continued: !nextMatch });
    }
    lastIndex = regex.lastIndex;

  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
    doc.font('ARIAL').fontSize(textSize).fillColor(textColor)
      .text(`${bulletLi} ${afterMatch}`,
        textLeft, doc.y, { width: textWidth });
  }
}

function sanitize(content) {
  return content.replace(/&nbsp;/g, ' ');
}

function addImageWithShadow(active, doc, imagePath, posX, posY, scaleFactor = 0.6, shadowOffset = 5) {
  if (!fs.existsSync(imagePath)) {
    console.error(`Image not found: ${imagePath}`);
    return;
  }
  const image = doc.openImage(imagePath);
  const newWidth = image.width * scaleFactor;
  const newHeight = image.height * scaleFactor;
  doc.image(imagePath, posX, posY, { width: newWidth, height: newHeight });
  if (active) {
    doc.rect(posX + 1, posY + 1, newWidth, newHeight)
      .strokeColor('#cccccc')
      .lineWidth(1)
      .stroke();
    doc.rect(posX, posY, newWidth, newHeight)
      .strokeColor('#ffffff')
      .lineWidth(2)
      .stroke();
  }
}

function addWhiteLine(doc, posY, thickness = 1) {
  const pageWidth = doc.page.width;
  const pageMargins = doc.page.margins.left + doc.page.margins.right;
  const lineWidth = (pageWidth - pageMargins) * 1;
  const startX = (pageWidth - lineWidth) / 2;
  const endX = startX + lineWidth;
  doc.moveTo(startX, posY)
    .lineTo(endX, posY)
    .strokeColor('#ffffff')
    .lineWidth(thickness)
    .stroke();
}


function generatePDF(data, outputPath, callback) {
  if (!fs.existsSync(path.dirname(outputPath))) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  }
  const doc = new PDFDocument({
    autoFirstPage: false,
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  doc.registerFont('ARIAL', ARIAL);
  doc.registerFont('ARIALBD', ARIALBD);
  doc.registerFont('ARIALBI', ARIALBI);
  doc.registerFont('ARIALI', ARIALI);

  doc.addPage({
    size: 'A4', margins: {
      top: PDF_TOP,
      bottom: PDF_BOTTOM,
      left: PDF_LEFT,
      right: PDF_RIGHT,
    }
  });

  const pageWidth = doc.page.width;
  const bullet = '•';

  let sizeDownTitle = 1;
  let sizeDownBrFirst = 0.2;
  let sizeDownBrSecond = 0.7;
  let sizeDownFont = 'ARIAL';

  let itemTitleSize = 24;
  let itemTitleWidth = 500;
  let itemTitleColor = '#2196f3';
  let itemTitleAlign = 'center';
  let itemTitleText = `Démarrer une Application Web avec Angular CLI 19`;
  let itemTitleFont = 'ARIALBD';
  let itemLineGap = 3;

  let itemTextLeft = 60;
  let itemTextSize = 14;
  let itemTextWith = 450;
  let itemTextColor = 'black';
  let itemTextAlign = 'left';
  let itemTextColorRef = '#2196f3';

  const xPos = (pageWidth - itemTitleWidth) / 2;
  doc.font(itemTitleFont)
    .fontSize(itemTitleSize)
    .fillColor(itemTitleColor)
    .text(itemTitleText,
      xPos,
      doc.y, {
      width: itemTitleWidth,
      align: itemTitleAlign,
      lineGap: itemLineGap
    });
  doc.font(itemTitleFont).moveDown(sizeDownTitle);

  doc.font('ARIALBD')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`Si vous ne l'installez pas, Angular ne fonctionnera pas.`,
      itemTextLeft,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap
    });

  doc.font(sizeDownFont).moveDown(sizeDownBrFirst);
  doc.font(sizeDownFont).moveDown(sizeDownBrSecond);

  doc.font('ARIAL')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`A ce propos Angular, React et Vuejs ont besoin tous trois de Node.js.`,
      itemTextLeft,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap
    });

  doc.font(sizeDownFont).moveDown(sizeDownBrFirst);
  doc.font(sizeDownFont).moveDown(sizeDownBrSecond);

  doc.font('ARIAL')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`Le site officiel c'est ici `,
      itemTextLeft,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      continued: true,
      lineGap: itemLineGap
    })
    .fillColor(itemTextColorRef)
    .text('https://nodejs.org/en', {
      link: 'https://nodejs.org/en',
      underline: true,
      lineGap: itemLineGap
    });
  doc.font(sizeDownFont).moveDown(sizeDownBrFirst);
  doc.font(sizeDownFont).moveDown(sizeDownBrSecond);

  doc.font('ARIAL')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`Voilà ce qu'il nous dit:`,
      itemTextLeft,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap
    });
  doc.font(sizeDownFont).moveDown(sizeDownBrFirst);

  doc.font('ARIALBD')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`Node.js est un environnement d’exécution JavaScript construit sur le moteur JavaScript V8 de Chrome.`,
      itemTextLeft,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap
    });
  doc.font(sizeDownFont).moveDown(sizeDownBrFirst);
  doc.font(sizeDownFont).moveDown(sizeDownBrSecond);

  doc.font('ARIAL')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`Son inventeur Ryan Lienhart Dahl l'a créé le 27 mai 2009.`,
      itemTextLeft,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap
    });

  doc.font('ARIAL')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`Il avait une idée précise derrière la tête : `,
      itemTextLeft,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      continued: true,
      lineGap: itemLineGap
    });

  doc.font('ARIALI')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`la simplicité et la rapidité d'exécution de programmes écrits en javascript.`,
      itemTextLeft,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap
    });
  doc.font(sizeDownFont).moveDown(sizeDownBrFirst);
  doc.font(sizeDownFont).moveDown(sizeDownBrSecond);

  doc.font('ARIAL')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`Le choix du nom n'est donc pas anodin.`,
      itemTextLeft,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap
    });
  doc.font(sizeDownFont).moveDown(sizeDownBrFirst);
  doc.font('ARIAL')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`${bullet}  Node signifie noeud`,
      itemTextLeft + 10,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap
    });
  doc.font(sizeDownFont).moveDown(sizeDownBrFirst);
  doc.font('ARIAL')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`Test signifie  signifie  signifie  signifie  signifie  signifie  signifie  signifie  signifie  signifie  signifie  signifie  signifie  signifie Test signifie Test signifie`,
      itemTextLeft + 23,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap
    });
  doc.font(sizeDownFont).moveDown(sizeDownBrFirst);
  doc.font('ARIAL')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`${bullet}  JS signifie javascript`,
      itemTextLeft + 10,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap
    });

  doc.end();
  stream.on('finish', () => {
    if (callback) callback();
  });
}


module.exports = {
  generatePDF,
};


