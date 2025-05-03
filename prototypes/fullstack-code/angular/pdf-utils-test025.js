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

const PDF_WIDTH = 535;
// const PDF_WIDTH_FULL = 595;

const PDF_INTRO = {
  titleFont: 'ARIALBD',
  titleSize: 24,
  titleWidth: PDF_WIDTH,
  titleLeft: 60,
  titleColor: '#2196f3',
  titleAlign: 'left',
  textFont: 'ARIAL',
  textSize: 14,
  textWidth: 495,
  textLeft: 50,
  textColor: 'black',
  textAlign: 'left',
}

const PDF_DOWN = {
  sizeBrFirst: 0.2,
  sizeBrSecond: 0.7,
  sizeFont: 'ARIAL',
}

const COLOR_HREF = '#2196f3';
const LINE_GAP = 3;
const BULLET_LI = '•';

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
    doc.font(PDF_DOWN.sizeFont).moveDown(PDF_DOWN.sizeBrSecond);
    checkPage(doc);
    doc.font(PDF_DOWN.sizeFont).moveDown(PDF_DOWN.sizeBrSecond);
    checkPage(doc);
  }

}

function writeTextLi(doc, text, font, color, width, size, left, align) {
  const bullet = BULLET_LI;
  const regex = /(<br>)(<br>)?|<strong>(.*?)<\/strong>|<em>(.*?)<\/em>|<a\s+href="([^"]+)">(.*?)<\/a>/g;
  let beforeContinued = false;
  let lastIndex = 0;
  let match;
  let index = 0;
  let bulletLi = '';
  let leftLi = 10;
  let textFormat = '';
  console.log('00000000000:' + text)

  while ((match = regex.exec(text)) !== null) {
    const beforeMatch = text.substring(lastIndex, match.index);
    const nextMatchBr = text.substring(match.index + match[0].length).trim().startsWith('<br>');
    let lastMatch = regex.lastIndex === text.length;

    console.log('00000000000:' + match + ':');
    console.log('00000000000:' + match[1] + ':');
    console.log('00000000000:' + match[2] + ':');
    console.log('00000000000:' + match[3] + ':');
    console.log('00000000000:' + match[4] + ':');
    console.log('00000000000:' + beforeContinued);

    if (beforeMatch) {
      if (match[1]) {
        index += 1; bulletLi = ''; leftLi = 23; if (index === 1) { bulletLi = bullet + '  '; leftLi = 10; }
        textFormat = `${bulletLi}${beforeMatch}`;
        console.log('00000000008:' + textFormat + ':' + beforeContinued);
        if (beforeContinued) { leftLi = 10; }
        beforeContinued = false;
        doc.font(font)
          .fontSize(size)
          .fillColor(color)
          .text(textFormat,
            left + leftLi,
            doc.y, {
            width: width,
            align: align,
            lineGap: LINE_GAP,
          });
        checkPage(doc);
      } else {
        index += 1; bulletLi = ''; leftLi = 23; if (index === 1) { bulletLi = bullet + '  '; leftLi = 10; }
        textFormat = `${bulletLi}${beforeMatch}`;
        console.log('00000000009:' + textFormat + ':' + beforeContinued);
        if (beforeContinued) { leftLi = 10; }
        beforeContinued = true;
        doc.font(font)
          .fontSize(size)
          .fillColor(color)
          .text(textFormat,
            left + leftLi,
            doc.y, {
            width: width,
            align: align,
            lineGap: LINE_GAP,
            continued: true,
          });
        checkPage(doc);
      }
    }
    if (match[1]) {
      beforeContinued = false;
      index += 1;
      doc.font(PDF_DOWN.sizeFont).moveDown(PDF_DOWN.sizeBrFirst);
      checkPage(doc);
      if (match[2]) {
        doc.font(PDF_DOWN.sizeFont).moveDown(PDF_DOWN.sizeBrSecond);
        checkPage(doc);
      }
    } else if (match[3]) {
      index += 1; bulletLi = ''; leftLi = 23; if (index === 1) { bulletLi = bullet + '  '; leftLi = 10; }
      textFormat = `${bulletLi}${match[3]}`;
      console.log('00000000010:' + textFormat + ':' + beforeContinued);
      if (beforeContinued) { leftLi = 10; }
      beforeContinued = !nextMatchBr && !lastMatch;
      doc.font('ARIALBD')
        .fontSize(size)
        .fillColor(color)
        .text(textFormat,
          left + leftLi,
          doc.y, {
          width: width,
          align: align,
          lineGap: LINE_GAP,
          continued: !nextMatchBr && !lastMatch
        });
      checkPage(doc);
    } else if (match[4]) {
      index += 1; bulletLi = ''; leftLi = 23; if (index === 1) { bulletLi = bullet + '  '; leftLi = 10; }
      textFormat = `${bulletLi}${match[4]}`;
      console.log('00000000011:' + textFormat + ':' + beforeContinued);
      if (beforeContinued) { leftLi = 10; }
      beforeContinued = !nextMatchBr && !lastMatch;
      doc.font('ARIALI')
        .fontSize(size)
        .fillColor(color)
        .text(textFormat,
          left + leftLi,
          doc.y, {
          width: width,
          align: align,
          lineGap: LINE_GAP,
          continued: !nextMatchBr && !lastMatch
        });
      checkPage(doc);
    } else if (match[5]) {
      console.log('00000000012:' + textFormat + ':' + beforeContinued);
      if (beforeContinued) { leftLi = 10; }
      beforeContinued = false;
      textFormat = match[6];
      doc.font(font)
        .fontSize(size)
        .fillColor(COLOR_HREF)
        .text(textFormat, {
          link: match[5],
          underline: true,
          lineGap: LINE_GAP,
        });
      checkPage(doc);
    }
    lastIndex = regex.lastIndex;

  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
    index += 1; bulletLi = ''; leftLi = 23; if (index === 1) { bulletLi = bullet + '  '; leftLi = 10; }
    beforeContinued = false;
    doc.font(font)
      .fontSize(size)
      .fillColor(color)
      .text(`${bulletLi}${afterMatch}`,
        left + leftLi,
        doc.y, {
        width: width,
        align: align,
        lineGap: LINE_GAP,
      });
    checkPage(doc);
  }

}

function writeTextUl(doc, text, font, color, width, size, left, align) {
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
      writeTextLi(doc, match[4], font, color, width, size, left, align);
      doc.font(PDF_DOWN.sizeFont).moveDown(PDF_DOWN.sizeBrSecond);
      checkPage(doc);
    }

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
  }
}

function writeTextP(doc, text, font, color, width, size, left, align) {

  const regex = /(<br>)(<br>)?|<strong>(.*?)<\/strong>|<em>(.*?)<\/em>|<a\s+href="([^"]+)">(.*?)<\/a>/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const beforeMatch = text.substring(lastIndex, match.index);
    const nextMatchBr = text.substring(match.index + match[0].length).trim().startsWith('<br>');
    let lastMatch = regex.lastIndex === text.length;

    if (beforeMatch) {
      if (match[1]) {
        doc.font(font)
          .fontSize(size)
          .fillColor(color)
          .text(beforeMatch,
            left,
            doc.y, {
            width: width,
            align: align,
            lineGap: LINE_GAP,
          });
        checkPage(doc);
      } else {
        doc.font(font)
          .fontSize(size)
          .fillColor(color)
          .text(beforeMatch,
            left,
            doc.y, {
            width: width,
            align: align,
            lineGap: LINE_GAP,
            continued: true
          });
        checkPage(doc);
      }
    }

    if (match[1]) {
      doc.font(PDF_DOWN.sizeFont).moveDown(PDF_DOWN.sizeBrFirst);
      checkPage(doc);
      if (match[2]) {
        doc.font(PDF_DOWN.sizeFont).moveDown(PDF_DOWN.sizeBrSecond);
        checkPage(doc);
      }
    } else if (match[3]) {
      doc.font('ARIALBD')
        .fontSize(size)
        .fillColor(color)
        .text(match[3],
          left,
          doc.y, {
          width: width,
          align: align,
          lineGap: LINE_GAP,
          continued: !nextMatchBr && !lastMatch
        });
      checkPage(doc);
    } else if (match[4]) {
      doc.font('ARIALI')
        .fontSize(size)
        .fillColor(color)
        .text(match[4],
          left,
          doc.y, {
          width: width,
          align: align,
          lineGap: LINE_GAP,
          continued: !nextMatchBr && !lastMatch
        });
      checkPage(doc);
    } else if (match[5]) {
      doc.font(font)
        .fontSize(size)
        .fillColor(COLOR_HREF)
        .text(match[6], {
          link: match[5],
          underline: true,
          lineGap: LINE_GAP,
        });
      checkPage(doc);
    }

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
    doc.font(font)
      .fontSize(size)
      .fillColor(color)
      .text(afterMatch,
        left,
        doc.y, {
        width: width,
        align: align,
        lineGap: LINE_GAP,
      });
    checkPage(doc);
  }
}

function writeText(doc, text, font, color, width, size, left, align) {
  const regex = /<p>(.*?)<\/p>|(<br>)|<ul>(.*?)<\/ul>/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const beforeMatch = text.substring(lastIndex, match.index);
    if (beforeMatch) {
    }

    if (match[1]) {
      writeTextP(doc, match[1], font, color, width, size, left, align);
    } else if (match[2]) {
    } else if (match[3]) {
      writeTextUl(doc, match[3], font, color, width, size, left, align);
    }

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
  }
}

function checkPage(doc) {
  if (doc.y + 50 > doc.page.height - PDF_BOTTOM) {
    addNewPage(doc);
  }
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

function writeContentManualLi(doc) {
  const bullet = '•';
  let sizeDownBrFirst = 0.2;
  let sizeDownFont = 'ARIAL';
  let itemLineGap = 3;
  let itemTextLeft = 60;
  let itemTextSize = 14;
  let itemTextWith = 450;
  let itemTextColor = 'black';
  let itemTextAlign = 'left';


  doc.font('ARIALBD')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`${bullet}  Node1`,
      60,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap,
      continued: true,
    });
  doc.font('ARIAL')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(` signifie`,
      {
        width: itemTextWith,
        align: itemTextAlign,
        lineGap: itemLineGap,
        continued: true,
      });
  doc.font('ARIALBD')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(` noeud`,
      {
        width: itemTextWith,
        align: itemTextAlign,
        lineGap: itemLineGap
      });
  doc.font('ARIALBD')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`Node`,
      73,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap,
      continued: true,
    });
  doc.font('ARIAL')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(` signifie signifie signifie signifie signifie signifie signifie signifie signifie signifie signifie signifie signifie signifie signifie signifie`,
      {
        width: itemTextWith,
        align: itemTextAlign,
        lineGap: itemLineGap,
        continued: true,
      });
  doc.font('ARIALBD')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(` noeud`,
      {
        width: itemTextWith,
        align: itemTextAlign,
        lineGap: itemLineGap
      });


  doc.font('ARIALBD')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`${bullet}  Node2`,
      60,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap,
      continued: true,
    });
  doc.font('ARIAL')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(` signifie`,
      {
        width: itemTextWith,
        align: itemTextAlign,
        lineGap: itemLineGap,
        continued: true,
      });
  doc.font('ARIALBD')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(` noeud`,
      {
        width: itemTextWith,
        align: itemTextAlign,
        lineGap: itemLineGap
      });
  doc.font(sizeDownFont).moveDown(sizeDownBrFirst);
  doc.font('ARIALBD')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(`Test`,
      73,
      doc.y, {
      width: itemTextWith,
      align: itemTextAlign,
      lineGap: itemLineGap,
      continued: true,
    });
  doc.font('ARIAL')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(` signifie  signifie  signifie  signifie  signifie  signifie  signifie  signifie  signifie  signifie  signifie  signifie  signifie  signifie Test signifie Test signifie`,
      {
        width: itemTextWith,
        align: itemTextAlign,
        lineGap: itemLineGap,
        continued: true,
      });
  doc.font('ARIALBD')
    .fontSize(itemTextSize)
    .fillColor(itemTextColor)
    .text(` signifie`,
      {
        width: itemTextWith,
        align: itemTextAlign,
        lineGap: itemLineGap,
        continued: true,
      });

  //     doc.font('ARIALBD')
  //   .fontSize(itemTextSize)
  //   .fillColor(itemTextColor)
  //   .text(`Node`,
  //     itemTextLeft + 23,
  //     doc.y, {
  //     width: itemTextWith,
  //     align: itemTextAlign,
  //     lineGap: itemLineGap,
  //     continued: true,
  //   });
  // doc.font('ARIAL')
  //   .fontSize(itemTextSize)
  //   .fillColor(itemTextColor)
  //   .text(` signifie`,
  //     {
  //       width: itemTextWith,
  //       align: itemTextAlign,
  //       lineGap: itemLineGap,
  //       cotinued: true,
  //     });
  // doc.font('ARIALBD')
  //   .fontSize(itemTextSize)
  //   .fillColor(itemTextColor)
  //   .text(`Noeud`,
  //     {
  //       width: itemTextWith,
  //       align: itemTextAlign,
  //       lineGap: itemLineGap
  //     });
  // doc.font(sizeDownFont).moveDown(sizeDownBrFirst);
  // doc.font('ARIALBD')
  //   .fontSize(itemTextSize)
  //   .fillColor(itemTextColor)
  //   .text(`${bullet}  JS`,
  //     itemTextLeft + 10,
  //     doc.y, {
  //     width: itemTextWith,
  //     align: itemTextAlign,
  //     lineGap: itemLineGap,
  //     continued: true,
  //   });
  // doc.font('ARIAL')
  //   .fontSize(itemTextSize)
  //   .fillColor(itemTextColor)
  //   .text(` signifie`,
  //     itemTextLeft + 10,
  //     doc.y, {
  //     width: itemTextWith,
  //     align: itemTextAlign,
  //     lineGap: itemLineGap,
  //     continued: true,
  //   });
  // doc.font('ARIALBD')
  //   .fontSize(itemTextSize)
  //   .fillColor(itemTextColor)
  //   .text(` javascript`,
  //     itemTextLeft + 10,
  //     doc.y, {
  //     width: itemTextWith,
  //     align: itemTextAlign,
  //     lineGap: itemLineGap,
  //   });
}


function generatePDF(data, outputPath, callback) {
  if (!fs.existsSync(path.dirname(outputPath))) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  }

  const doc = new PDFDocument({
    size: PDF_SIZE,
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


  let pageWidth = doc.page.width;
  let pageHeight = doc.page.height;

  let marginLeft = doc.page.margins.left;
  let marginRight = doc.page.margins.right;
  let marginTop = doc.page.margins.top;
  let marginBottom = doc.page.margins.bottom;

  let contentWidth = pageWidth - marginLeft - marginRight;
  let contentHeight = pageHeight - marginTop - marginBottom;

  writeContentManualLi(doc);

  // data.elements.forEach((element, index) => {

  //   let typeimage = element.typeimage;
  //   let typetext = element.typetext;
  //   let typeintro = element.typeintro;
  //   let typecode = element.typecode;
  //   let typechapter = element.typechapter;
  //   let typesignup = element.typesignup;

  //   let linkable = element.linkable;
  //   let title = element.title;
  //   let content = element.content;
  //   content = sanitize(content);

  //   let displayText = false;


  //   if (!typeimage && !typeintro && !typecode && !typechapter && !typesignup) {
  //     if (typetext) {
  //       displayText = true;
  //     }
  //   }

  //   if (displayText) {

  //     let textHeight = 0;
  //     xCentered = marginLeft + (contentWidth - PDF_INTRO.titleWidth) / 2;
  //     if (linkable) {
  //       doc.font(PDF_INTRO.titleFont).fontSize(PDF_INTRO.titleSize);
  //       textHeight = doc.heightOfString(`${index}-${title}`, {
  //         width: PDF_INTRO.titleWidth,
  //         align: 'center',
  //         lineGap: 3,
  //       });
  //     }
  //     content = addParagraph(content);
  //     content = sanitize(content);
  //     doc.font(PDF_INTRO.textFont).fontSize(PDF_INTRO.textSize);
  //     textHeight += doc.heightOfString(`${content}`, {
  //       width: PDF_INTRO.textWidth,
  //       align: 'left',
  //       lineGap: 3,
  //     });
  //     lineHeight = doc.currentLineHeight();
  //     if (linkable) {
  //       spaceAdded = PDF_DOWN.sizeBrSecond * lineHeight;
  //       textHeight = textHeight + spaceAdded;
  //     }
  //     while (doc.y + textHeight > contentHeight) {
  //       checkPageNew(doc);
  //       textHeight -= contentHeight;
  //     }
  //     if (linkable) {
  //       doc.font(PDF_INTRO.titleFont).fontSize(PDF_INTRO.titleSize);
  //       doc.fillColor(PDF_INTRO.titleColor)
  //         .text(`${index}-${title}`, xCentered, doc.y, {
  //           width: PDF_INTRO.titleWidth,
  //           align: 'center',
  //           lineGap: 3,
  //         });
  //       doc.font(PDF_DOWN.sizeFont).moveDown(PDF_DOWN.sizeBrSecond);
  //     } else {
  //       addLine('grey', doc, doc.y, 1);
  //     }
  //     writeText(doc,
  //       content,
  //       PDF_INTRO.textFont,
  //       PDF_INTRO.textColor,
  //       PDF_INTRO.textWidth,
  //       PDF_INTRO.textSize,
  //       PDF_INTRO.textLeft,
  //     );
  //   }

  // })

  doc.end();
  stream.on('finish', () => {
    if (callback) callback();
  });
}


module.exports = {
  generatePDF,
};


