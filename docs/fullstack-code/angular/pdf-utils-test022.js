const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const ARIAL = path.join(__dirname, 'ARIAL.TTF');
const ARIALBD = path.join(__dirname, 'ARIALBD.TTF');
const ARIALBI = path.join(__dirname, 'ARIALBI.TTF');
const ARIALI = path.join(__dirname, 'ARIALI.TTF');

const PDF_SIZE = 'A4';
const PDF_TOP = 40;
const PDF_BOTTOM = 40;
const PDF_LEFT = 30;
const PDF_RIGHT = 30;
const PDF_WIDTH = 1;

const SIZE_DOWN_BR = 1;
const SIZE_DOWN_BR_FIRST = 0.2;
const SIZE_DOWN_BR_SECOND = 0.7;

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

const ITEM_LINE_GAP = 3;

const PDF_INTRO = {
  titleSize: 24,
  titleWidth: 535,
  titleColor: '#2196f3',
  textSize: 14,
  textWidth: 400,
  textColor: 'black',
}

function sanitize(content) {
  return content.replace(/&nbsp;/g, ' ');
}

function addParagraph(content) {
  if (/^\s*<(p|ul)>/.test(content)) {
    return content;
  }
  return `<p>${content}</p>`;
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

function addLine(color, doc, posY, thickness = 1) {
  const pageWidth = doc.page.width;
  const pageMargins = doc.page.margins.left + doc.page.margins.right;
  const lineWidth = (pageWidth - pageMargins) * 1;
  const startX = (pageWidth - lineWidth) / 2;
  const endX = startX + lineWidth;
  doc.moveTo(startX, posY)
    .lineTo(endX, posY)
    .strokeColor(color)
    .lineWidth(thickness)
    .stroke();
  if (color !== 'white') {
    doc.font('ARIAL').moveDown(SIZE_DOWN_BR_SECOND);
    checkPage(doc);
    doc.font('ARIAL').moveDown(SIZE_DOWN_BR_SECOND);
    checkPage(doc);
  }

}

function writeTextLi(type, doc, text) {

  const bullet = '•';
  let sizeDownBrFirst = 0.2;
  let sizeDownBrSecond = 0.7;
  let sizeDownFont = 'ARIAL';
  let itemLineGap = 3;
  let itemTextLeft = 60;
  let itemTextSize = 14;
  let itemTextWith = 450;
  let itemTextColor = 'black';
  if (type === 1) {
    itemTextWith = 250;
    itemTextColor = 'white';
  }
  if (type === 2) {
    itemTextWith = 250;
    itemTextColor = 'white';
  }
  let itemTextAlign = 'left';
  let itemTextColorRef = '#2196f3';

  const regex = /(<br>)(<br>)?|<strong>(.*?)<\/strong>|<em>(.*?)<\/em>|<a\s+href="([^"]+)">(.*?)<\/a>/g;

  let lastIndex = 0;
  let match;
  let index = 0;
  let bulletLi = '';
  let leftLi = 10;

  while ((match = regex.exec(text)) !== null) {
    const beforeMatch = text.substring(lastIndex, match.index);
    const nextMatchBr = text.substring(match.index + match[0].length).trim().startsWith('<br>');
    let lastMatch = regex.lastIndex === text.length;

    if (beforeMatch) {
      if (match[1]) {
        index += 1; bulletLi = ''; leftLi = 23; if (index === 1) { bulletLi = bullet + '  '; leftLi = 10; }
        doc.font('ARIAL')
          .fontSize(itemTextSize)
          .fillColor(itemTextColor)
          .text(`${bulletLi}${beforeMatch}`,
            itemTextLeft + leftLi,
            doc.y, {
            width: itemTextWith,
            align: itemTextAlign,
            lineGap: itemLineGap,
          });
        checkPage(doc);
      } else {
        index += 1; bulletLi = ''; leftLi = 23; if (index === 1) { bulletLi = bullet + '  '; leftLi = 10; }
        doc.font('ARIAL')
          .fontSize(itemTextSize)
          .fillColor(itemTextColor)
          .text(`${bulletLi}${beforeMatch}`,
            itemTextLeft + leftLi,
            doc.y, {
            width: itemTextWith,
            align: itemTextAlign,
            lineGap: itemLineGap,
            continued: true,
          });
        checkPage(doc);
      }
    }

    if (match[1]) {
      index += 1;
      doc.font(sizeDownFont).moveDown(sizeDownBrFirst);
      checkPage(doc);
      if (match[2]) {
        doc.font(sizeDownFont).moveDown(sizeDownBrSecond);
        checkPage(doc);
      }
    } else if (match[3]) {
      index += 1; bulletLi = ''; leftLi = 23; if (index === 1) { bulletLi = bullet + '  '; leftLi = 10; }
      doc.font('ARIALBD')
        .fontSize(itemTextSize)
        .fillColor(itemTextColor)
        .text(`${bulletLi}${match[3]}`,
          itemTextLeft + leftLi,
          doc.y, {
          width: itemTextWith,
          align: itemTextAlign,
          lineGap: itemLineGap,
          continued: !nextMatchBr && !lastMatch
        });
      checkPage(doc);
    } else if (match[4]) {
      index += 1; bulletLi = ''; leftLi = 23; if (index === 1) { bulletLi = bullet + '  '; leftLi = 10; }
      doc.font('ARIALI')
        .fontSize(itemTextSize)
        .fillColor(itemTextColor)
        .text(`${bulletLi}${match[4]}`,
          itemTextLeft + leftLi,
          doc.y, {
          width: itemTextWith,
          align: itemTextAlign,
          lineGap: itemLineGap,
          continued: !nextMatchBr && !lastMatch
        });
      checkPage(doc);
    } else if (match[5]) {
      doc.font('ARIAL')
        .fontSize(itemTextSize)
        .fillColor(itemTextColorRef)
        .text(match[6], {
          link: match[5],
          underline: true,
          lineGap: itemLineGap
        });
      checkPage(doc);
    }
    lastIndex = regex.lastIndex;

  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
    index += 1; bulletLi = ''; leftLi = 23; if (index === 1) { bulletLi = bullet + '  '; leftLi = 10; }
    doc.font('ARIAL')
      .fontSize(itemTextSize)
      .fillColor(itemTextColor)
      .text(`${bulletLi}${afterMatch}`,
        itemTextLeft + leftLi,
        doc.y, {
        width: itemTextWith,
        align: itemTextAlign,
        lineGap: itemLineGap,
      });
    checkPage(doc);
  }

}

function writeTextUl(type, doc, text) {
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
      writeTextLi(type, doc, match[4]);
      doc.font('ARIAL').moveDown(SIZE_DOWN_BR_SECOND);
      checkPage(doc);
    }

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
  }
}

function writeTextP(type, doc, text) {
  console.log('00000000001:' + text);
  let sizeDownBrFirst = 0.2;
  let sizeDownBrSecond = 0.7;
  let sizeDownFont = 'ARIAL';
  let itemLineGap = 3;
  let itemTextLeft = 60;
  let itemTextSize = 14;
  let itemTextWith = 450;
  let itemTextColor = 'black';
  if (type === 1) {
    itemTextWith = 250;
    itemTextColor = 'white';
  }
  if (type === 2) {
    itemTextWith = 250;
    itemTextColor = 'white';
  }

  let itemTextAlign = 'left';
  let itemTextColorRef = '#2196f3';

  const regex = /(<br>)(<br>)?|<strong>(.*?)<\/strong>|<em>(.*?)<\/em>|<a\s+href="([^"]+)">(.*?)<\/a>/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const beforeMatch = text.substring(lastIndex, match.index);
    const nextMatchBr = text.substring(match.index + match[0].length).trim().startsWith('<br>');
    let lastMatch = regex.lastIndex === text.length;

    if (beforeMatch) {
      if (match[1]) {
        doc.font('ARIAL')
          .fontSize(itemTextSize)
          .fillColor(itemTextColor)
          .text(beforeMatch,
            itemTextLeft,
            doc.y, {
            width: itemTextWith,
            align: itemTextAlign,
            lineGap: itemLineGap
          });
        checkPage(doc);
      } else {
        doc.font('ARIAL')
          .fontSize(itemTextSize)
          .fillColor(itemTextColor)
          .text(beforeMatch,
            itemTextLeft,
            doc.y, {
            width: itemTextWith,
            align: itemTextAlign,
            lineGap: itemLineGap,
            continued: true
          });
        checkPage(doc);
      }
    }

    if (match[1]) {
      doc.font(sizeDownFont).moveDown(sizeDownBrFirst);
      checkPage(doc);
      if (match[2]) {
        doc.font(sizeDownFont).moveDown(sizeDownBrSecond);
        checkPage(doc);
      }
    } else if (match[3]) {
      doc.font('ARIALBD')
        .fontSize(itemTextSize)
        .fillColor(itemTextColor)
        .text(match[3],
          itemTextLeft,
          doc.y, {
          width: itemTextWith,
          align: itemTextAlign,
          lineGap: itemLineGap,
          continued: !nextMatchBr && !lastMatch
        });
      checkPage(doc);
    } else if (match[4]) {
      doc.font('ARIALI')
        .fontSize(itemTextSize)
        .fillColor(itemTextColor)
        .text(match[4],
          itemTextLeft,
          doc.y, {
          width: itemTextWith,
          align: itemTextAlign,
          lineGap: itemLineGap,
          continued: !nextMatchBr && !lastMatch
        });
      checkPage(doc);
    } else if (match[5]) {
      doc.font('ARIAL')
        .fontSize(itemTextSize)
        .fillColor(itemTextColorRef)
        .text(match[6], {
          link: match[5],
          underline: true,
          lineGap: itemLineGap
        });
      checkPage(doc);
    }

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
    doc.font('ARIAL')
      .fontSize(itemTextSize)
      .fillColor(itemTextColor)
      .text(afterMatch,
        itemTextLeft,
        doc.y, {
        width: itemTextWith,
        align: itemTextAlign,
        lineGap: itemLineGap
      });
    checkPage(doc);
  }
}

function writeText(type, doc, text) {
  const regex = /<p>(.*?)<\/p>|(<br>)|<ul>(.*?)<\/ul>/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const beforeMatch = text.substring(lastIndex, match.index);
    if (beforeMatch) {
    }

    if (match[1]) {
      writeTextP(type, doc, match[1]);
    } else if (match[2]) {
    } else if (match[3]) {
      writeTextUl(type, doc, match[3]);
    }

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
    // doc.font('ARIAL').fontSize(textSize).fillColor(textColor)
    //   .text(afterMatch,
    //     textLeft, doc.y, { width: textWidth, });
  }
}

function checkPage(doc) {
  if (doc.y + 50 > doc.page.height - PDF_BOTTOM) {
    addNewPage(doc);
  }
}

function writeContentManualP(doc, content) {
  let sizeDownBrFirst = 0.2;
  let sizeDownBrSecond = 0.7;
  let sizeDownFont = 'ARIAL';
  let itemLineGap = 3;
  let itemTextLeft = 60;
  let itemTextSize = 14;
  let itemTextWith = 450;
  let itemTextColor = 'black';
  let itemTextAlign = 'left';
  let itemTextColorRef = '#2196f3';

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
  checkPage(doc);
  doc.font(sizeDownFont).moveDown(sizeDownBrFirst);
  checkPage(doc);
  doc.font(sizeDownFont).moveDown(sizeDownBrSecond);
  checkPage(doc);

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
  checkPage(doc);
  doc.font(sizeDownFont).moveDown(sizeDownBrFirst);
  checkPage(doc);
  doc.font(sizeDownFont).moveDown(sizeDownBrSecond);
  checkPage(doc);

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
  checkPage(doc);
  doc.font(sizeDownFont).moveDown(sizeDownBrSecond);
  checkPage(doc);

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
  checkPage(doc);

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
  checkPage(doc);
  doc.font(sizeDownFont).moveDown(sizeDownBrSecond);
  checkPage(doc);

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
  checkPage(doc);

  doc.font('ARIAL')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`Il avait une idée précise derrière la tête : `,
      itemTextLeft,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap,
      continued: true,
    });
  checkPage(doc);

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
  checkPage(doc);
  doc.font(sizeDownFont).moveDown(sizeDownBrFirst);
  checkPage(doc);
  doc.font(sizeDownFont).moveDown(sizeDownBrSecond);
  checkPage(doc);

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
  checkPage(doc);
  doc.font(sizeDownFont).moveDown(sizeDownBrFirst);
  checkPage(doc);
}

function writeContentManualLi(doc, content) {
  const bullet = '•';
  let sizeDownBrFirst = 0.2;
  let sizeDownBrSecond = 0.7;
  let sizeDownFont = 'ARIAL';
  let itemLineGap = 3;
  let itemTextLeft = 60;
  let itemTextSize = 14;
  let itemTextWith = 450;
  let itemTextColor = 'black';
  let itemTextAlign = 'left';
  let itemTextColorRef = '#2196f3';

  doc.font('ARIALBD')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`${bullet}  Node`,
      itemTextLeft + 10,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap,
      continued: true,
    });
  checkPage(doc);
  doc.font('ARIAL')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(` signifie`,
      itemTextLeft + 10,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap,
      continued: true,
    });
  checkPage(doc);
  doc.font('ARIALBD')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(` noeud`,
      itemTextLeft + 10,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap
    });
  checkPage(doc);
  doc.font(sizeDownFont).moveDown(sizeDownBrFirst);
  checkPage(doc);
  doc.font('ARIALBD')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`Test`,
      itemTextLeft + 23,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap,
      continued: true,
    });
  checkPage(doc);
  doc.font('ARIAL')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(` signifie  signifie  signifie  signifie  signifie  signifie  signifie  signifie  signifie  signifie  signifie  signifie  signifie  signifie Test signifie Test signifie`,
      itemTextLeft + 23,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap
    });
  checkPage(doc);
  doc.font(sizeDownFont).moveDown(sizeDownBrFirst);
  checkPage(doc);
  doc.font('ARIALBD')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`${bullet}  JS`,
      itemTextLeft + 10,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap,
      continued: true,
    });
  checkPage(doc);
  doc.font('ARIAL')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(` signifie`,
      itemTextLeft + 10,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap,
      continued: true,
    });
  checkPage(doc);
  doc.font('ARIALBD')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(` javascript`,
      itemTextLeft + 10,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap,
    });
  checkPage(doc);
}

function addNewPage(doc) {
  doc.addPage({
    size: PDF_SIZE,
    top: PDF_TOP,
    bottom: PDF_BOTTOM,
    left: PDF_LEFT,
    right: PDF_RIGHT,
  });
}

function writeTitle(doc, width, font, size, color, text, align) {
  const SIZE_DOWN_TITLE = 1;

  const pageWidth = doc.page.width;
  const xPos = (pageWidth - width) / 2;
  doc.font(font)
    .fontSize(size)
    .fillColor(color)
    .text(text,
      xPos,
      doc.y, {
      width: width,
      align: align,
      lineGap: ITEM_LINE_GAP
    });
  checkPage(doc);
  doc.font(font).moveDown(SIZE_DOWN_TITLE);
  checkPage(doc);
}

function checkPageNew(doc) {
  doc.addPage({
    size: 'A4',
    margins: {
      top: PDF_TOP,
      bottom: PDF_BOTTOM,
      left: PDF_LEFT,
      right: PDF_RIGHT,
    }
  });
}

function generatePDF(data, outputPath, callback) {
  if (!fs.existsSync(path.dirname(outputPath))) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  }

  const doc = new PDFDocument({
    size: 'A4',
    margins: {
      top: PDF_TOP,
      bottom: PDF_BOTTOM,
      left: PDF_LEFT,
      right: PDF_RIGHT,
    }
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  doc.registerFont('ARIAL', ARIAL);
  doc.registerFont('ARIALBD', ARIALBD);
  doc.registerFont('ARIALBI', ARIALBI);
  doc.registerFont('ARIALI', ARIALI);

  // const bullet = '•';

  // let itemTitleSize = 24;
  // let itemTitleWidth = 500;
  // let itemTitleColor = '#2196f3';
  // let itemTitleAlign = 'center';
  // let itemTitleFont = 'ARIALBD';


  let pageWidth = doc.page.width;
  let pageHeight = doc.page.height;

  let marginLeft = doc.page.margins.left;
  let marginRight = doc.page.margins.right;
  let marginTop = doc.page.margins.top;
  let marginBottom = doc.page.margins.bottom;

  let contentWidth = pageWidth - marginLeft - marginRight;
  let contentHeight = pageHeight - marginTop - marginBottom;

  // let textWidth = 0;
  // let xCentered = 0;
  // let lineHeight = 0;
  // let spaceAdded = 0;
  // let textWidthItem = 200;
  // let pathImages = 'D:/chendra/02-applications/201-admin/01-data/admin/features/images/tutorials/';
  // let releaseDate = data.releaseDate;

  data.elements.forEach((element, index) => {

    let typeimage = element.typeimage;
    let typetext = element.typetext;
    let typeintro = element.typeintro;
    let typecode = element.typecode;
    let typechapter = element.typechapter;
    let typesignup = element.typesignup;

    let linkable = element.linkable;
    let title = element.title;
    let content = element.content;
    content = sanitize(content);

    // let itemTitleText = element.title;
    // let codefilename = element.codefilename;
    // let nameimage = element.nameimage;
    // let libelleImage = element.libelleimage;
    // let chapternameimage = element.chapternameimage;

    let displayIntro = false;
    let displayText = false;
    let displayChapter = false;
    let displayImage = false;
    let displayCode = false;


    if (!typeimage && !typeintro && !typecode && !typechapter && !typesignup) {
      if (typetext) {
        displayText = true;
      }
    }

    // if (!typeimage && typeintro && !typecode && !typechapter && !typesignup) {
    //   if (typetext) {
    //     displayIntro = true;
    //   }
    // }


    // if (typechapter) {
    //   displayChapter = true;
    // }

    // if (typeimage) {
    //   displayImage = true;
    // }

    // if (typecode) {
    //   displayCode = true;
    // }

    // A3
    // doc.font('ARIAL').fontSize(20).fillColor('black')
    //   .text('abcdefghijklmnopqrstuvwxyz-abcdefghijklmnopqrstuvwxyz-abcdefghi', 
    //     0, 0, 
    //     { width: 612 });

    // A4
    // doc.font('ARIAL').fontSize(20).fillColor('black')
    //   .text('abcdefghijklmnopqrstuvwxyz-abcdefghijklmnopqrstuvwxyz-abcdefg', 
    //     0, 0, 
    //     { width: 595 });

    if (displayText) {

      textHeight = 0;
      xCentered = marginLeft + (contentWidth - PDF_INTRO.titleWidth) / 2;
      if (linkable) {
        doc.font('ARIALBD').fontSize(PDF_INTRO.titleSize);
        let textHeight = doc.heightOfString(`${index}-${title}`, {
          width: PDF_INTRO.titleWidth,
          align: 'center',
          lineGap: 3,
        });
      }
      content = addParagraph(content);
      content = sanitize(content);
      doc.font('ARIAL').fontSize(PDF_INTRO.textSize);
      textHeight += doc.heightOfString(`${content}`, {
        width: PDF_INTRO.textWidth,
        align: 'left',
        lineGap: 3,
      });
      lineHeight = doc.currentLineHeight();
      if (linkable) {
        spaceAdded = SIZE_DOWN_BR_SECOND * lineHeight;
        textHeight = textHeight + spaceAdded;
      }
      while (doc.y + textHeight > contentHeight) {
        checkPageNew(doc);
        textHeight -= contentHeight;
      }
      if (linkable) {
        doc.font('ARIALBD').fontSize(PDF_INTRO.titleSize);
        doc.fillColor(PDF_INTRO.titleColor)
          .text(`${index}-${title}`, xCentered, doc.y, {
            width: PDF_INTRO.titleWidth,
            align: 'center',
            lineGap: 3,
          });
        doc.font('ARIAL').moveDown(SIZE_DOWN_BR_SECOND);
      } else {
        addLine('grey', doc, doc.y, 1);
      }
      writeText(3, doc, content);
    }


    // if (displayText) {
    //   doc.font('ARIAL').fontSize(20).fillColor('black')
    //     .text('abcdefghijklmnopqrstuvwxyz-abcdefghijklmnopqrstuvwxyz-abcdefg',
    //       0, 0,
    //       { width: 595 });
    // }


  })

  doc.end();
  stream.on('finish', () => {
    if (callback) callback();
  });
}


module.exports = {
  generatePDF,
};


