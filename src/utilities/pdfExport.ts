import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface PDFExportOptions {
  filename?: string;
  quality?: number;
  format?: 'a4' | 'letter';
  margin?: number;
}

export const exportToPDF = async (
  elementId: string, 
  options: PDFExportOptions = {}
): Promise<void> => {
  const {
    filename = 'CV_Portafolio.pdf',
    quality = 1.0,
    format = 'a4',
    margin = 10
  } = options;

  try {
    // Encontrar el elemento a exportar
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with id "${elementId}" not found`);
    }

    // Mostrar estado de carga
    const loadingToast = document.createElement('div');
    loadingToast.innerHTML = `
      <div style="
        position: fixed; 
        top: 20px; 
        right: 20px; 
        background: #3b82f6; 
        color: white; 
        padding: 12px 24px; 
        border-radius: 8px; 
        z-index: 9999;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        font-family: system-ui, -apple-system, sans-serif;
      ">
        📄 Generando PDF...
      </div>
    `;
    document.body.appendChild(loadingToast);

    // Configurar canvas con alta calidad
    const canvas = await html2canvas(element, {
      scale: quality * 2, // Mayor escala para mejor calidad
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: element.scrollWidth,
      height: element.scrollHeight,
    });

    // Configurar dimensiones del PDF
    const imgWidth = format === 'a4' ? 210 : 216; // mm
    const pageHeight = format === 'a4' ? 297 : 279; // mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const marginMM = margin;
    const contentWidth = imgWidth - (marginMM * 2);
    const contentHeight = (canvas.height * contentWidth) / canvas.width;

    // Crear PDF
    const pdf = new jsPDF({
      orientation: imgHeight > pageHeight ? 'portrait' : 'portrait',
      unit: 'mm',
      format: format,
    });

    // Agregar título del documento
    pdf.setFontSize(16);
    pdf.setTextColor(51, 51, 51);

    // Si el contenido es muy alto, dividir en páginas
    if (contentHeight > pageHeight - (marginMM * 2)) {
      const totalPages = Math.ceil(contentHeight / (pageHeight - (marginMM * 2)));
      
      for (let i = 0; i < totalPages; i++) {
        if (i > 0) {
          pdf.addPage();
        }
        
        const sourceY = i * (canvas.height / totalPages);
        const sourceHeight = canvas.height / totalPages;
        
        // Crear canvas para esta sección
        const pageCanvas = document.createElement('canvas');
        const pageCtx = pageCanvas.getContext('2d');
        pageCanvas.width = canvas.width;
        pageCanvas.height = sourceHeight;
        
        if (pageCtx) {
          pageCtx.fillStyle = '#ffffff';
          pageCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
          pageCtx.drawImage(
            canvas, 
            0, sourceY, canvas.width, sourceHeight,
            0, 0, pageCanvas.width, pageCanvas.height
          );
          
          const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.95);
          pdf.addImage(
            pageImgData, 
            'JPEG', 
            marginMM, 
            marginMM, 
            contentWidth, 
            pageHeight - (marginMM * 2)
          );
        }
      }
    } else {
      // Contenido cabe en una página
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      pdf.addImage(imgData, 'JPEG', marginMM, marginMM, contentWidth, contentHeight);
    }

    // Agregar metadatos
    pdf.setProperties({
      title: 'CV Profesional - Portafolio IA',
      subject: 'Curriculum Vitae generado desde Portafolio IA',
      author: 'Plataforma Portafolio IA',
      creator: 'Portafolio IA - Sistema de Validación de Habilidades',
    });

    // Descargar el PDF
    pdf.save(filename);

    // Remover indicador de carga
    document.body.removeChild(loadingToast);

    // Mostrar confirmación
    const successToast = document.createElement('div');
    successToast.innerHTML = `
      <div style="
        position: fixed; 
        top: 20px; 
        right: 20px; 
        background: #10b981; 
        color: white; 
        padding: 12px 24px; 
        border-radius: 8px; 
        z-index: 9999;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        font-family: system-ui, -apple-system, sans-serif;
      ">
        ✅ PDF descargado exitosamente
      </div>
    `;
    document.body.appendChild(successToast);
    
    setTimeout(() => {
      if (document.body.contains(successToast)) {
        document.body.removeChild(successToast);
      }
    }, 3000);

  } catch (error) {
    console.error('Error generating PDF:', error);
    
    // Mostrar error
    const errorToast = document.createElement('div');
    errorToast.innerHTML = `
      <div style="
        position: fixed; 
        top: 20px; 
        right: 20px; 
        background: #ef4444; 
        color: white; 
        padding: 12px 24px; 
        border-radius: 8px; 
        z-index: 9999;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        font-family: system-ui, -apple-system, sans-serif;
      ">
        ❌ Error al generar PDF
      </div>
    `;
    document.body.appendChild(errorToast);
    
    setTimeout(() => {
      if (document.body.contains(errorToast)) {
        document.body.removeChild(errorToast);
      }
    }, 3000);
  }
};

// Función auxiliar para generar un PDF optimizado para CV
export const exportProfileToPDF = async (elementId: string, fullName: string): Promise<void> => {
  const filename = `CV_${fullName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  
  await exportToPDF(elementId, {
    filename,
    quality: 1.2,
    format: 'a4',
    margin: 15,
  });
}; 