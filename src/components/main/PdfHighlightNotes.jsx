import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Rnd } from "react-rnd";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  ListGroup,
  ListGroupItem,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Set worker URL for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfHighlightNotes = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [note, setNote] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfFile(URL.createObjectURL(file));
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setCurrentPage(1); // Reset to the first page when a new PDF is loaded
  };

  const handleAddNote = () => {
    setSelectedRegions((prev) =>
      prev.map((region) =>
        region.id === currentRegion.id ? { ...region, note } : region
      )
    );
    setShowModal(false);
    setNote("");
    setCurrentRegion(null);
  };

  const handleRegionClick = (region) => {
    setCurrentRegion(region);
    setNote(region.note || "");
    setShowModal(true);
  };

  const addNewRegion = () => {
    const newRegion = {
      id: Date.now(),
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      page: currentPage,
      note: "",
    };
    setSelectedRegions((prev) => [...prev, newRegion]);
    setCurrentRegion(newRegion);
  };

  const updateRegionPositionAndSize = (id, position, size) => {
    setSelectedRegions((prev) =>
      prev.map((region) =>
        region.id === id ? { ...region, ...position, ...size } : region
      )
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteRegion = (id) => {

    setSelectedRegions((prev) => prev.filter((region) => region.id !== id));

  };

  return (
    <div className="container mt-4">
      <h3>PDF Annotation Tool</h3>
      <input
        type="file"
        accept="application/pdf"
        onChange={handlePdfUpload}
        className="mb-4"
      />

      {pdfFile && (
        <>
          <Document
            file={pdfFile}
            onLoadSuccess={onDocumentLoadSuccess}
            className="mb-4"
          >
            <div style={{ position: "relative", marginBottom: "20px" }}>
              <Page
                pageNumber={currentPage}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
              {selectedRegions
                .filter((region) => region.page === currentPage)
                .map((region) => (
                  <Rnd
                    key={region.id}
                    size={{
                      width: region.width,
                      height: region.height,
                    }}
                    position={{
                      x: region.x,
                      y: region.y,
                    }}
                    bounds="parent"
                    onDragStop={(e, data) => {
                      updateRegionPositionAndSize(region.id, { x: data.x, y: data.y }, {});
                    }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                      updateRegionPositionAndSize(
                        region.id,
                        position,
                        {
                          width: parseFloat(ref.style.width),
                          height: parseFloat(ref.style.height),
                        }
                      );
                    }}
                    style={{
                      border: "2px solid purple",
                      background: "rgba(128, 0, 128, 0.2)",
                      position: "absolute",
                    }}
                    onClick={() => handleRegionClick(region)}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: -20,
                        right: -20,
                        cursor: "pointer",
                        zIndex: 1000,
                      }}
                    >
                      <button
                        onClick={() => handleDeleteRegion(region.id)}
                        className="btn btn-danger btn-sm"
                      >
                        X
                      </button>
                    </div>
                  </Rnd>
                ))}
              <button onClick={addNewRegion} className="btn btn-primary mt-3">
                Add Selection to Page {currentPage}
              </button>
            </div>
          </Document>

          <Pagination>
            <PaginationItem disabled={currentPage <= 1}>
              <PaginationLink
                previous
                onClick={() => handlePageChange(currentPage - 1)}
              />
            </PaginationItem>
            {Array.from({ length: numPages }, (_, index) => (
              <PaginationItem
                key={index + 1}
                active={index + 1 === currentPage}
              >
                <PaginationLink onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem disabled={currentPage >= numPages}>
              <PaginationLink
                next
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          </Pagination>
        </>
      )}

      <ListGroup className="mt-4">
        {selectedRegions.map((region, index) => (
          <ListGroupItem
            key={region.id}
            onClick={() => handlePageChange(region.page)}
            style={{ cursor: "pointer" }}
          >
            Page {region.page}, Note {index + 1}: {region.note}
          </ListGroupItem>
        ))}
      </ListGroup>

      <Modal isOpen={showModal} toggle={() => setShowModal(false)}>
        <ModalHeader toggle={() => setShowModal(false)}>Add a Note</ModalHeader>
        <ModalBody>
          <Input
            type="textarea"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Enter your note here"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleAddNote}>
            Save Note
          </Button>
          <Button color="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default PdfHighlightNotes;
