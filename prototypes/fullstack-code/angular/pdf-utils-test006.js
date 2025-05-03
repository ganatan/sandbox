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

function writeText(topPage, bottomPage, leftPage, rightPage, textColor, textWidth, size, sizedown, doc, text) {
  if (doc.y + 20 > doc.page.height - doc.page.margins.bottom) {
    doc.addPage({
      size: 'A4', margins: {
        top: topPage,
        bottom: bottomPage,
        left: leftPage,
        right: rightPage,
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
      console.log('0000000000')
      writeTextP(textColor, textWidth, size, sizedown, doc, match[1]);
    } else if (match[2]) {
      doc.font('ARIAL').moveDown(sizedown);
    } else if (match[3]) {
      writeTextUl(textColor, textWidth, size, sizedown, doc, match[3]);
    }

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
    doc.font('ARIAL').fontSize(size).fillColor(textColor).text(afterMatch, PDF_LEFT, doc.y, { width: textWidth });
  }
}

function writeTextP(topPage, bottomPage, leftPage, rightPage, textColor, textWidth, size, sizedown, doc, text) {
  if (doc.y + 20 > doc.page.height - doc.page.margins.bottom) {
    doc.addPage({
      size: 'A4', margins: {
        top: topPage,
        bottom: bottomPage,
        left: leftPage,
        right: rightPage,
      }
    });
  }

  const regex = /(<br>)|<strong>(.*?)<\/strong>|<i>(.*?)<\/i>/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const beforeMatch = text.substring(lastIndex, match.index);
    const nextMatch = text.substring(match.index + match[0].length).trim().startsWith('<br>');

    if (beforeMatch) {
      if (match[1]) {
        doc.font('ARIAL').fontSize(size).fillColor(textColor).text(beforeMatch, PDF_LEFT, doc.y, { width: textWidth });
        doc.font('ARIAL').moveDown(sizedown);
      } else {
        doc.font('ARIAL').fontSize(size).fillColor(textColor).text(beforeMatch, PDF_LEFT, doc.y, { width: textWidth, continued: true });
      }
    }

    if (match[1]) {
      doc.font('ARIAL').moveDown(SIZE_DOWN_BR);
    } else if (match[2]) {
      doc.font('ARIALBD').fontSize(size).fillColor(textColor).text(match[2], PDF_LEFT, doc.y, { width: textWidth, continued: !nextMatch });
    } else if (match[3]) {
      doc.font('ARIALI').fontSize(size).fillColor(textColor).text(match[3], PDF_LEFT, doc.y, { width: textWidth, continued: true });
    }

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
    doc.font('ARIAL').fontSize(size).fillColor(textColor).text(afterMatch, PDF_LEFT, doc.y, { width: textWidth });
    doc.font('ARIAL').moveDown(sizedown);
  }
}

function writeTextUl(topPage, bottomPage, leftPage, rightPage, textColor, textWidth, size, sizedown, doc, text) {
  if (doc.y + 20 > doc.page.height - doc.page.margins.bottom) {
    doc.addPage({
      size: 'A4', margins: {
        top: topPage,
        bottom: bottomPage,
        left: leftPage,
        right: rightPage,
      }
    });
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
      writeTextLi(textColor, textWidth, size, sizedown, doc, match[4]);
    }

    lastIndex = regex.lastIndex;
  }

  const afterMatch = text.substring(lastIndex);
  if (afterMatch) {
  }
}

function writeTextLi(topPage, bottomPage, leftPage, rightPage, textColor, textWidth, size, sizedown, doc, text) {
  const bullet = '•';
  if (doc.y + 20 > doc.page.height - doc.page.margins.bottom) {
    doc.addPage({
      size: 'A4', margins: {
        top: topPage,
        bottom: bottomPage,
        left: leftPage,
        right: rightPage,
      }
    });
  }
  const regex = /(<br>)|<strong>(.*?)<\/strong>|<i>(.*?)<\/i>/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const beforeMatch = text.substring(lastIndex, match.index);
    if (beforeMatch) {
      if (match[1]) {
        doc.font('ARIAL').fontSize(size).fillColor(textColor).text(`${beforeMatch}`, PDF_LEFT, doc.y, { width: textWidth });
        doc.font('ARIAL').moveDown(sizedown);
      } else {
        doc.font('ARIAL').fontSize(size).fillColor(textColor).text(`${bullet} ${beforeMatch}`, PDF_LEFT, doc.y, { width: textWidth, continued: true });
      }
    }

    if (match[1]) {
      doc.font('ARIAL').moveDown(SIZE_DOWN_BR);
    } else if (match[2]) {
      doc.font('ARIALBD').fontSize(size).fillColor(textColor).text(match[2], PDF_LEFT, doc.y, { width: textWidth, continued: true });
    } else if (match[3]) {
      doc.font('ARIALI').fontSize(size).fillColor(textColor).text(match[3], PDF_LEFT, doc.y, { width: textWidth, continued: true });
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

  let pathImages = 'D:/chendra/02-applications/201-admin/01-data/admin/features/images/tutorials/';
  let releaseDate = data.releaseDate;

  let stepNumber = 0;
  data.elements.forEach((element, index) => {
    let typeimage = element.typeimage;
    let nameimage = element.nameimage;
    let chapternameimage = element.chapternameimage;
    let typetext = element.typetext;
    let content = sanitize(element.content);
    let typeintro = element.typeintro;
    let typecode = element.typecode;
    let typechapter = element.typechapter;
    let typesignup = element.typesignup;
    let linkable = element.linkable;
    let title = element.title;
    let textColorTitle = 'white';
    let textColor = 'black';
    let size = 14;
    let sizedown = 0.2;
    let sizedownTitle = 0.4;

    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
    const pageMargins = doc.page.margins.left + doc.page.margins.right;

    let textPrdWidth = pageWidth - pageMargins;
    let textItemWidth = (pageWidth - pageMargins) * ITEM_WIDTH;
    let textIntroWidth = (pageWidth - pageMargins) * INTRO_WIDTH;


    if (typetext) {

      // if (typeintro) {
      //   let nameimageBanner = 'introduction-banner.png';
      //   let imagePathBanner = pathImages + nameimageBanner;
      //   const imageBanner = doc.openImage(imagePathBanner);
      //   let imgWidthBanner = imageBanner.width;
      //   let imgHeightBanner = imageBanner.height;
      //   let scaleFactorBanner = 0.75;
      //   let newWidthBanner = imgWidthBanner * scaleFactorBanner;
      //   let newHeightBanner = imgHeightBanner * scaleFactorBanner;

      //   let centerX = (pageWidth - newWidthBanner) / 2;
      //   let posY = 18;
      //   doc.image(imagePathBanner, centerX, posY, {
      //     width: newWidthBanner,
      //     height: newHeightBanner,
      //   });

      //   let nameimageIntro = 'introduction-background.png';
      //   let imagePathIntro = pathImages + nameimageIntro;
      //   doc.image(imagePathIntro, 0, 60, {
      //     width: pageWidth,
      //     height: pageHeight,
      //   });

      //   const nameImageTutorial = 'tutorial.png';
      //   const imagePathTutorial = path.join(pathImages, nameImageTutorial);
      //   addImageWithShadow(true, doc, imagePathTutorial, 350, 380);

      //   doc.y += 65;
      //   textColorTitle = 'white';
      //   doc.font('ARIALBD').fontSize(34).fillColor(textColorTitle).text(title, PDF_LEFT, doc.y, {
      //     width: textWidthItem,
      //     align: 'center'
      //   });

      //   doc.y += 40;
      //   textColorTitle = 'grey';
      //   let guideTitle = 'Guide Complet';
      //   doc.font('ARIALBD').fontSize(26).fillColor('#D9D9D9').text(guideTitle, PDF_LEFT, doc.y, {
      //     width: textWidthItem,
      //     align: 'center'
      //   });

      //   const linePosY = doc.y + 45;
      //   addWhiteLine(doc, linePosY);

      //   doc.y += 60;
      //   textColorTitle = 'white';
      //   doc.font('ARIALBD').fontSize(12).fillColor(textColorTitle).text(releaseDate, PDF_LEFT, doc.y, {
      //     width: textWidthItem,
      //     align: 'right'
      //   });

      //   textColor = 'white';
      //   doc.y += 30;
      //   let sizeIntro = 18;
      //   writeText(ITEM_LEFT, textColor, textWidthIntro, sizeIntro, sizedown, doc, content);
      //   doc.addPage({
      //     size: 'A4', margins: {
      //       top: PDF_TOP,
      //       bottom: PDF_BOTTOM,
      //       left: PDF_LEFT,
      //       right: PDF_RIGHT,
      //     }
      //   });
      // }

      // if (typechapter) {

      //   let nameimageIntro = 'introduction-background.png';
      //   let imagePathIntro = pathImages + nameimageIntro;
      //   doc.image(imagePathIntro, 0, 0, {
      //     width: pageWidth,
      //     height: pageHeight,
      //   });
      //   stepNumber = stepNumber + 1;
      //   textColorTitle = 'white';
      //   doc.font('ARIALBD').fontSize(34).fillColor(textColorTitle).text('Etape ' + stepNumber, 50, 150, {
      //     width: textWidthItem,
      //     align: 'center'
      //   });

      //   const nameImageChapter = chapternameimage;
      //   const imagePathChapter = path.join(pathImages, nameImageChapter);
      //   addImageWithShadow(false, doc, imagePathChapter, 350, 380);

      //   textColor = 'white';
      //   doc.y += 0;
      //   let sizeIntro = 18;
      //   writeText(ITEM_LEFT, textColor, textWidthIntro, sizeIntro, sizedown, doc, content);
      //   doc.addPage({
      //     size: 'A4', margins: {
      //       top: PDF_TOP,
      //       bottom: PDF_BOTTOM,
      //       left: PDF_LEFT,
      //       right: PDF_RIGHT,
      //     }
      //   });
      // }

      if (!typeintro && !typechapter && !typeimage && !typecode && !typesignup) {

        if (linkable) {

          const pageWidth = doc.page.width;
          const xPosition = (pageWidth - 400) / 2;
          doc.font('ARIALBD')
            .fontSize(24)
            .fillColor('black')
            .text('Intro Title Intro Title Intro Title Intro Title Intro Title Intro Title Intro Title',
              xPosition, doc.y, {
              width: 400,
              align: 'center'
            });
          doc.font('ARIAL').moveDown(1);

          doc.font('ARIAL')
            .fontSize(24)
            .fillColor('black')
            .text('Intro Data Intro Data Intro Data',
              30, doc.y, {
              width: 200,
              align: 'left'
            });

          const nameImageTutorial = 'tutorial.png';
          const imagePathTutorial = path.join(pathImages, nameImageTutorial);
          addImageWithShadow(true, doc, imagePathTutorial, 350, 380);
          addImageWithShadow(true, doc, imagePathTutorial, 350, 80);

          doc.addPage({
            size: 'A4', margins: {
              top: PDF_TOP,
              bottom: PDF_BOTTOM,
              left: PDF_LEFT,
              right: PDF_RIGHT,
            }
          });

          doc.font('ARIALBD')
            .fontSize(24)
            .fillColor('black')
            .text('Item Title Item Title Item Title Item Title Item Title Item Title Item Title',
              xPosition, doc.y, {
              width: 400,
              align: 'center'
            });
          doc.font('ARIAL').moveDown(1);

          doc.font('ARIAL')
            .fontSize(24)
            .fillColor('black')
            .text('Item Data Item Data Item Data Item Data Item Data',
              30, doc.y, {
              width: 400,
              align: 'left'
            });
          // doc.font('ARIAL').moveDown(1);


          // doc.font('ARIALBD').fontSize(24).fillColor('black')
          //   .text('Intro Title Intro Title Intro Title Intro Title Intro Title Intro Title Intro Title', 0, doc.y, {
          //     align: 'center'
          //   });
          // doc.font('ARIAL').moveDown(1);

          // doc.font('ARIALBD')
          //   .fontSize(24)
          //   .fillColor('black')
          //   .text('Intro Content Intro Content Intro Content ', 30, doc.y, { width: 200 });
          // doc.font('ARIAL').moveDown(1);

          // doc.font('ARIALBD').fontSize(24).fillColor('black')
          //   .text('Item Title Item Title Item Title ', 30, doc.y);
          // doc.font('ARIAL').moveDown(1);

          // doc.font('ARIALBD').fontSize(24).fillColor('black')
          //   .text('Item Content Item Content Item Content ', 30, doc.y);
          // doc.font('ARIAL').moveDown(1);

          // textColorTitle = '#2196f3';
          // doc.font('ARIALBD').fontSize(24).fillColor(textColorTitle).text('Title', PDF_LEFT, doc.y, {
          //   width: textItemWidth,
          // });

          // textColorTitle = '#2196f3';
          // doc.font('ARIALBD').fontSize(24).fillColor(textColorTitle).text('content', PDF_LEFT, doc.y, {
          //   width: textItemWidth,
          //   align: 'center,'
          // });

          // textColorTitle = '#2196f3';
          // doc.font('ARIALBD').fontSize(24).fillColor(textColorTitle).text('Title', INTRO_LEFT, doc.y, {
          //   width: textItemWidth,
          // });

          // textColorTitle = '#2196f3';
          // doc.font('ARIALBD').fontSize(24).fillColor(textColorTitle).text('content', INTRO_LEFT, doc.y, {
          //   width: textItemWidth,
          //   align: 'center,'
          // });

          // textColorTitle = '#2196f3';
          // doc.font('ARIALBD').fontSize(24).fillColor(textColorTitle).text('Title', ITEM_LEFT, doc.y, {
          //   width: textItemWidth,
          //   align: 'center,'
          // });

          // textColorTitle = '#2196f3';
          // doc.font('ARIALBD').fontSize(24).fillColor(textColorTitle).text('content', ITEM_LEFT, doc.y, {
          //   width: textItemWidth,
          // });

          // textColorTitle = '#2196f3';
          // doc.font('ARIALBD').fontSize(24).fillColor(textColorTitle).text('aaaa', PDF_LEFT, doc.y, {
          //   width: textWidthItem,
          //   align: 'center'
          // });

          // doc.font('ARIAL').moveDown(sizedownTitle);

          // textColorTitle = '#2196f3';
          // doc.font('ARIALBD').fontSize(24).fillColor(textColorTitle).text(title, PDF_LEFT, doc.y, {
          //   width: textItemWidth,
          //   align: 'center'
          // });

          // doc.font('ARIAL').moveDown(sizedownTitle);
          // textColor = 'black';
          // writeText(ITEM_LEFT, textColor, textWidthItem, size, sizedown, doc, content);

        }

        // if (!linkable) {
        //   textColor = 'black';
        //   writeText(ITEM_LEFT, textColor, textWidthItem, size, sizedown, doc, content);
        // }


      }

    }

    // if (typecode) {
    //   doc.font('ARIALBD').fontSize(24).fillColor(textColorTitle).text('aaaa', PDF_LEFT, doc.y);
    //   textColor = 'black';
    //   writeText(ITEM_LEFT, textColor, textWidthItem, size, sizedown, doc, content);
    // }


    if (typeimage) {
      let imagePath = pathImages + nameimage;
      const image = doc.openImage(imagePath);
      const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
      let imgWidth = image.width;
      let imgHeight = image.height;
      const scaleFactor = 0.75;
      imgWidth *= scaleFactor;
      imgHeight *= scaleFactor;
      let availableHeight = doc.page.height - doc.y - doc.page.margins.bottom;
      if (imgHeight > availableHeight) {
        doc.addPage({
          size: 'A4', margins: {
            top: PDF_TOP,
            bottom: PDF_BOTTOM,
            left: PDF_LEFT,
            right: PDF_RIGHT,
          }
        });
      }

      availableHeight = doc.page.height - doc.y - doc.page.margins.bottom;
      if (imgWidth > pageWidth || imgHeight > availableHeight) {
        const scaleFactor = Math.min(pageWidth / imgWidth, availableHeight / imgHeight);
        imgWidth *= scaleFactor;
        imgHeight *= scaleFactor;
      }
      doc.font('ARIALBD').fontSize(24).fillColor(('black')).text('aaaa', PDF_LEFT, doc.y);
      doc.image(imagePath, (doc.page.width - imgWidth) / 2, doc.y, {
        width: imgWidth,
        height: imgHeight
      });
      doc.y += imgHeight + 10;
      doc.font('ARIALBD').fontSize(24).fillColor(('black')).text('bbbb');
      doc.font('ARIALBD').fontSize(24).fillColor(('black')).text('bbbb', PDF_LEFT, doc.y);

    }

  })

  doc.end();
  stream.on('finish', () => {
    if (callback) callback();
  });
}

module.exports = {
  generatePDF,
};

