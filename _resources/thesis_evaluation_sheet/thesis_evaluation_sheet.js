async function pdfForm() {
    // await import("https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js");
    const { jsPDF } = window.jspdf;
    window.margin = 20;
    window.fontSize = {
        title: 20,
        normal: 10,
        bold: 10,
        subitem: 12,
        section: 14,
        footnote: 8,
    }
    const doc = new jsPDF(
        {
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            margins: { top: margin, bottom: margin, left: margin, right: margin },
            fontSize: fontSize.normal,
        }
    );
    window.y = margin; // Initial position for text
    window.lineHeight = 5; // Adjust as needed
    window.newParSpace = 10; // Adjust as needed
    window.currentY = window.y + window.lineHeight; // Start position for text
    window.maxPageHeight = doc.internal.pageSize.height - margin; // Page height minus bottom margin
    window.pageWidth = doc.internal.pageSize.getWidth();
    window.threshold = 80; // Threshold for short lines (e.g., number of characters)
    window.availableWidth = window.pageWidth - 2 * margin;
    window.sectionWidth = window.availableWidth / 3; // Width of each section
    window.tabSpace = doc.getTextWidth("\t"); // Width of a tab character
    let pageNumber = 1;

    // Function to add page number
    function addPageNumber(doc, pageNumber) {
        doc.setFontSize(fontSize.footnote);
        doc.text(`Page ${pageNumber}`, pageWidth - margin - doc.getTextWidth("Page 100"), doc.internal.pageSize.height - 10);
        doc.setFontSize(fontSize.normal);
    }

    // Add the image to the PDF
    const logoData = await addLogo();
    doc.addImage(logoData, 'PNG', doc.internal.pageSize.getWidth() - 15 - margin, 5, 15, 7.5);
    // set title
    doc.setFontSize(fontSize.title);
    doc.text("Student Thesis Evaluation Form", doc.internal.pageSize.getWidth() / 2, currentY, { align: 'center' });
    doc.setFontSize(fontSize.normal);
    // Get the form data
    const form = document.getElementById("evaluationForm");
    const formData = new FormData(form);
    // Add the form data to the PDF
    currentY += newParSpace;
    const thesisTypeWidth = doc.getTextWidth("Thesis Type: ");
    doc.setFont(undefined, 'bold');
    doc.text("Thesis Type: ", margin, currentY);
    doc.setFont(undefined, 'normal');
    doc.text(formData.get('thesisType'), margin + thesisTypeWidth + 2, currentY);
    const beginWidth = doc.getTextWidth("Begin: ");
    doc.setFont(undefined, 'bold');
    doc.text("Begin: ", margin + sectionWidth, currentY);
    doc.setFont(undefined, 'normal');
    doc.text(formData.get('beginDate'), margin + sectionWidth + beginWidth + 2, currentY);
    const endWidth = doc.getTextWidth("End: ");
    doc.setFont(undefined, 'bold');
    doc.text("End: ", margin + 2 * sectionWidth, currentY);
    doc.setFont(undefined, 'normal');
    doc.text(formData.get('endDate'), margin + 2 * sectionWidth + endWidth + 2, currentY);
    
    currentY += lineHeight;
    const studentTitleWidth = doc.getTextWidth("Student: ");
    doc.setFont(undefined, 'bold');
    doc.text("Student: ", margin, currentY);
    doc.setFont(undefined, 'normal');
    const studentName = formData.get('studentName');
    const studentWidth = doc.getTextWidth("Student: " + studentName);
    doc.text(formData.get('studentName'), margin + studentTitleWidth + 2, currentY);
    const supervisors = formData.get('supervisor').replace(/\n/g, ', ').split(', ');
    const supervisorTitleWidth = doc.getTextWidth("Supervisor: ");
    const supervisorX = margin + studentWidth + tabSpace;
    // const supervisorX = margin + sectionWidth + (sectionWidth - supervisorTitleWidth - doc.getTextWidth(supervisors)) / 2;
    if (supervisors.length > 1) {
        doc.setFont(undefined, 'bold');
        doc.text("Supervisors: ", margin + supervisorX, currentY);
        doc.setFont(undefined, 'normal');
        doc.text(supervisors.join(', '), margin + supervisorX + supervisorTitleWidth + 4, currentY);
    } else {
        doc.setFont(undefined, 'bold');
        doc.text("Supervisor: ", margin + supervisorX, currentY);
        doc.setFont(undefined, 'normal');
        doc.text(supervisors, margin + supervisorX + supervisorTitleWidth + 2, currentY);
    }

    currentY += newParSpace;
    const titleWidth = doc.getTextWidth("Title: ");
    doc.setFont(undefined, 'bold');
    doc.text("Title: ", margin, currentY);
    doc.setFont(undefined, 'normal');
    doc.text(formData.get('title'), margin + titleWidth + 2, currentY);
    currentY += newParSpace;
    // const summaryWidth = doc.getTextWidth("Summary of the thesis and scientific contribution: ");
    doc.setFont(undefined, 'bold');
    doc.text("Summary of the thesis and scientific contribution: ", margin, currentY);
    doc.setFont(undefined, 'normal');
    currentY += lineHeight;
    const summaryText = formData.get('summary');
    let adjustedLines = justifyText(doc, summaryText, pageWidth, margin, threshold);
    addText(doc, adjustedLines, margin, currentY, { align: 'justify', maxWidth: doc.internal.pageSize.width - margin * 2 });
    currentY += lineHeight;
    // calculate the height of the text
    const summaryHeight = doc.getTextDimensions(adjustedLines, { align: 'justify', maxWidth: doc.internal.pageSize.width - margin * 2 }).h;
    currentY += summaryHeight;
    doc.setFont(undefined, 'bold');
    doc.text("Publication possible? ", margin, currentY);
    doc.setFont(undefined, 'normal');
    doc.text(formData.get('publication'), margin + doc.getTextWidth("Publication possible? ") + 4, currentY);
    if (formData.get('publication') === 'Yes') {
        currentY += lineHeight;
        const publicationVenueText = "Target: " + formData.get('publicationVenue');
        const adjustedLines = justifyText(doc, publicationVenueText, pageWidth, margin, threshold);
        addText(doc, adjustedLines, margin, currentY, { align: 'justify', maxWidth: doc.internal.pageSize.width - margin * 2 });
        const publicationVenueHeight = doc.getTextDimensions(adjustedLines, { align: 'justify', maxWidth: doc.internal.pageSize.width - margin * 2 }).h;
        currentY += publicationVenueHeight;
    } else {currentY += lineHeight;}
    // currentY += newParSpace;
    doc.setFont(undefined, 'bold');
    doc.text("Recommend for an award? ", margin, currentY);
    doc.setFont(undefined, 'normal');
    if (formData.get('award') === 'Yes') {
        doc.text('Yes;', margin + doc.getTextWidth("Recommend for an award? ") + 4, currentY);
        currentY += lineHeight;
        const motivationText = formData.get('awardMotivation');
        const adjustedLines = justifyText(doc, motivationText, pageWidth, margin, threshold);
        addText(doc, adjustedLines, margin, currentY, { align: 'justify', maxWidth: doc.internal.pageSize.width - margin * 2 });
        const motivationHeight = doc.getTextDimensions(adjustedLines, { align: 'justify', maxWidth: doc.internal.pageSize.width - margin * 2 }).h;
        currentY += motivationHeight + lineHeight;
    } else { 
        currentY += lineHeight; 
        doc.text('No', margin + doc.getTextWidth("Recommend for an award? ") + 4, currentY);
    }
    currentY += lineHeight;

    // Evaluation Criteria Section
    doc.setFont(undefined, 'bold');
    doc.setFontSize(fontSize.section);
    doc.text("Evaluation", margin, currentY);
    doc.setFontSize(fontSize.normal);
    currentY += lineHeight / 2;
    doc.setDrawColor(128, 128, 128);   doc.line(margin, currentY, pageWidth - margin, currentY, 'S'); doc.setDrawColor(0);
    currentY += lineHeight * 1.5;
    const evalItems = document.querySelectorAll('div.eval-item');
    evalItems.forEach(evalItem => {
        const subItemsTitles = evalItem.querySelectorAll('div.subitem-title');
        const subItemsGrades = evalItem.querySelectorAll('div.subitem-grade');
        const subItemsTexts = evalItem.querySelectorAll('div.subitem-description');
        const h6Element = evalItem.querySelector('h6');
        const inputElement = h6Element.querySelector('input[type="text"]');
        const title = h6Element ? h6Element.textContent.replace('(%)','(' + inputElement.value + '%)') : '';
        if ((currentY + lineHeight * 4) <= maxPageHeight) {
            doc.setFont(undefined, 'bold');
            doc.setFontSize(fontSize.subitem);
            doc.text(title, margin, currentY);
            doc.setFontSize(fontSize.normal);
            currentY += lineHeight;
        } else {
            addPageNumber(doc, pageNumber);
            doc.addPage();
            pageNumber++;
            currentY = margin;
            doc.setFont(undefined, 'bold');
            doc.setFontSize(fontSize.subitem);
            doc.text(title, margin, currentY);
            doc.setFontSize(fontSize.normal);
            currentY += lineHeight;
        }
        subItemsTitles.forEach((subItemsTitles, index) => {
            const subItemText = subItemsTexts[index].querySelector('textarea').value;
            const adjustedLines = justifyText(doc, subItemText, pageWidth, margin, threshold);
            const subItemTextHeight = doc.getTextDimensions(adjustedLines, { align: 'justify', maxWidth: doc.internal.pageSize.width - margin * 2 }).h;
            if (currentY + lineHeight * 2 + subItemTextHeight > maxPageHeight) {
                addPageNumber(doc, pageNumber);
                doc.addPage();
                pageNumber++;
                currentY = margin;
            }
            currentY += lineHeight / 2;
            doc.setFont(undefined, 'bold');
            const text = subItemsTitles.textContent.trim() + ' (' + subItemsGrades[index].querySelector('input[type="radio"]:checked').value + ')';
            const textW = doc.getTextWidth(text);
            doc.text(text, margin, currentY);
            doc.setFont(undefined, 'normal');
            currentY += lineHeight;
            
            addText(doc, adjustedLines, margin, currentY, { align: 'justify', maxWidth: doc.internal.pageSize.width - margin * 2 });
            
            currentY += subItemTextHeight;
        });
        currentY += lineHeight;
    });

    // proposed grade
    doc.setFont(undefined, 'bold');
    doc.text("Proposed Grade: ", margin, currentY);
    doc.setFont(undefined, 'normal');
    doc.text(formData.get('proposedGrade'), margin + doc.getTextWidth("Proposed Grade: ") + 4, currentY);
    currentY += lineHeight;
    // comments
    const commentsText = formData.get('comments').trim();
    if (commentsText) {
        doc.setFont(undefined, 'bold');
        doc.text("Comments: ", margin, currentY);
        doc.setFont(undefined, 'normal');
        currentY += lineHeight;
        adjustedLines = justifyText(doc, commentsText, pageWidth, margin, threshold);
        addText(doc, adjustedLines, margin, currentY, { align: 'justify', maxWidth: doc.internal.pageSize.width - margin * 2 });
        const commentsHeight = doc.getTextDimensions(adjustedLines, { align: 'justify', maxWidth: doc.internal.pageSize.width - margin * 2 }).h;
        currentY += commentsHeight + lineHeight;
    }
    // add date of exporting the pdf
    const date = new Date();
    const dateString = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    doc.setFont(undefined, 'bold');
    doc.text("Exported on: ", margin, currentY);
    doc.setFont(undefined, 'normal');
    doc.text(dateString, margin + doc.getTextWidth("Exported on: ") + 4, currentY);
    // Add page number to the last page
    addPageNumber(doc, pageNumber);
    // Save the PDF
    // create date in yyyy-mm-dd format
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const newdate = year + (month < 10 ? '0' + month : month.toString().padStart(2, '0')) + (day < 10 ? '0' + day : day.toString().padStart(2, '0'));
    let fileName = `${formData.get('studentName').replace(' ', '_')}-${formData.get('thesisType').replace(/[\s.]/g, '')}-${supervisors.join('__').replace(' ', '_')}-${newdate}`;
    fileName = fileName.replace(/[^a-zA-Z0-9-_]/g, '_');
    doc.save(fileName);
}

function addText(doc, text, x, y, options) {
    const pageHeight = doc.internal.pageSize.height;
    const lineHeight = 10; // Adjust line height as necessary
    let currentY = y;

    if (Array.isArray(text)) {
        text.forEach(line => {
            const textHeight = doc.getTextDimensions(line, options).h || lineHeight;
            if (currentY + textHeight > pageHeight) {
                doc.addPage();
                currentY = options.margin || 10; // Reset to top margin
            }
            doc.text(line, x, currentY, options);
            currentY += textHeight;
        });
    } else {
        const textHeight = doc.getTextDimensions(text, options).h || lineHeight;
        if (currentY + textHeight > pageHeight) {
            doc.addPage();
            currentY = options.margin || 10; // Reset to top margin
        }
        doc.text(text, x, currentY, options);
    }
}

function justifyText(doc, text, pageWidth, margin, threshold) {
    // Split into paragraphs first
    const paragraphs = text.split(/\n\s*\n/).map(p => p.trim());
    
    // Process each paragraph separately
    return paragraphs.map(paragraph => {
        const summaryLines = doc.splitTextToSize(paragraph, pageWidth - 2 * margin);
        return summaryLines.map(line => {
            let adjustedLine = line.trim();
            while (doc.getTextWidth(adjustedLine) <= pageWidth - 2 * margin) {
                adjustedLine += ' ';
            }
            return adjustedLine.trimEnd(); // Remove excessive trailing spaces
        }).filter(line => line.trim() !== '');
    });
}

function addLogo() {
    const imgElement = document.getElementById('tumLogo');

    return new Promise((resolve, reject) => {
        imgElement.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Set canvas dimensions to image size
            canvas.width = imgElement.naturalWidth;
            canvas.height = imgElement.naturalHeight;

            // Draw the image to the canvas
            ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

            // Reduce the quality of the image by scaling it down
            const scaledCanvas = document.createElement('canvas');
            const scaledCtx = scaledCanvas.getContext('2d');
            const scaleFactor = 0.5; // Adjust this factor to control the quality

            scaledCanvas.width = canvas.width * scaleFactor;
            scaledCanvas.height = canvas.height * scaleFactor;

            scaledCtx.drawImage(canvas, 0, 0, scaledCanvas.width, scaledCanvas.height);

            // Convert the scaled canvas to base64 PNG image data
            const imgData = scaledCanvas.toDataURL('image/png', 0.5); // Adjust the quality parameter if needed
            resolve(imgData);
        };

        // If the image is already loaded, manually trigger the onload event
        if (imgElement.complete) {
            imgElement.onload();
        }
    });
}