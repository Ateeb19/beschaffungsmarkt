import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { LiaBuysellads } from "react-icons/lia";
import { LiaSellcast } from "react-icons/lia";
import { MdOutlineEmojiTransportation } from "react-icons/md";
import { GiLinkedRings } from "react-icons/gi";
import { useAlert } from "../../alert/Alert_message";
import { RxCross2 } from "react-icons/rx";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaExclamationTriangle } from "react-icons/fa";

const DragAndDrop = ({ accept, onFileDrop, label, className }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileDrop(acceptedFiles);
      }
    },
    [onFileDrop]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`d-flex flex-column align-items-center justify-content-center text-center ${className}`}
    >
      <input {...getInputProps()} />
      <p>{label}</p>
    </div>
  );
};




const Das_newPost = () => {
  const Backend_URL = process.env.REACT_APP_API_URL;
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const { showAlert } = useAlert();

  //details
  const [postType, setPostType] = useState('buying');
  const [Current_title, setCurrent_title] = useState('');
  const [Current_detail, setCurrent_detail] = useState('');
  const [errors, setErrors] = useState({});

  const [image_changed_banner, setImage_changed_banner] = useState(false);
  const [selectedFiles_banner, setSelectedFiles_banner] = useState([]);
  const [selectedImages_banner, setSelectedImages_banner] = useState([]);

  const handleFileDrop_banner = (files) => {
    setImage_changed_banner(true);
    const newFiles = [...selectedFiles_banner, ...files];
    setSelectedFiles_banner(newFiles);

    // Generate preview URLs
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setSelectedImages_banner((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveBanner = (index) => {
    const newFiles = selectedFiles_banner.filter((_, i) => i !== index);
    const newPreviews = selectedImages_banner.filter((_, i) => i !== index);

    setSelectedFiles_banner(newFiles);
    setSelectedImages_banner(newPreviews);
  };

  const tabData = {
    buying: {
      title: "I want to import poplin fabric",
      details: "We are a manufacturer of women's clothing in the Netherlands. We want to purchase poplin fabric to be used in production."
    },
    selling: {
      title: "We are selling organic cotton fabric",
      details: "Our company provides high-quality organic cotton fabric. We are looking for long-term buyers across Europe."
    },
    cooperation: {
      title: "Looking for business cooperation",
      details: "We are looking for partners to expand our textile business and co-develop sustainable clothing lines."
    },
    transport: {
      title: "Need transportation service for fabric",
      details: "We are searching for reliable transportation partners to ship fabrics from Turkey to the Netherlands."
    }
  };

  useEffect(() => {
    setTitle(tabData[postType].title);
    setDetails(tabData[postType].details);
  }, [postType]);

  const handleTabClick = (type) => {
    setPostType(type);
  };

  const validateFields = () => {
    const newErrors = {};
    if (!Current_title.trim()) newErrors.Current_title = "Title is required.";
    if (!Current_detail.trim()) newErrors.Current_detail = "Detail is required.";

    setErrors(newErrors);

    // return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateFields()) {
      return;
    }

    // if valid, continue
    showAlert(
      <>
        <FaExclamationTriangle className="me-2 fs-2 text-warning" />
        Please upgrade your membership to upload product
      </>,
      "warning"
    );
  };
  return (
    <div className="add-post-wrapper text-start">
      <div className="">
        <h5 className="mb-4">New Post</h5>
        <div className="das-general-form">
          <form  >
            {/* Post Type Tabs */}
            <div className="mb-3">
              <label className="form-label">
                Your Post Type <span className="text-danger">*</span>
              </label>
              <div className="d-flex flex-wrap w-100 tab-container">
                <label
                  className={`post-tab ${postType === 'buying' ? 'active' : ''} flex-fill text-center shadow`}
                  data-type="buying"
                  onClick={() => handleTabClick('buying')}
                >
                  <input type="radio" name="postType" checked={postType === 'buying'} readOnly />
                  <span><LiaBuysellads /> Buying Post</span>
                </label>
                <label
                  className={`post-tab ${postType === 'selling' ? 'active' : ''} flex-fill text-center shadow`}
                  data-type="selling"
                  onClick={() => handleTabClick('selling')}
                >
                  <input type="radio" name="postType" checked={postType === 'selling'} readOnly />
                  <span><LiaSellcast /> Selling Offer</span>
                </label>
                <label
                  className={`post-tab ${postType === 'cooperation' ? 'active' : ''} flex-fill text-center shadow`}
                  data-type="cooperation"
                  onClick={() => handleTabClick('cooperation')}
                >
                  <input type="radio" name="postType" checked={postType === 'cooperation'} readOnly />
                  <span><GiLinkedRings /> Cooperation</span>
                </label>
                <label
                  className={`post-tab ${postType === 'transport' ? 'active' : ''} flex-fill text-center shadow`}
                  data-type="transport"
                  onClick={() => handleTabClick('transport')}
                >
                  <input type="radio" name="postType" checked={postType === 'transport'} readOnly />
                  <span> <MdOutlineEmojiTransportation /> Transportation</span>
                </label>
              </div>
            </div>

            {/* Title Input */}
            <div className="mb-3">
              <label className="form-label">
                Title Of Your Post <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.Current_title ? 'general-country-border' : ''}`}
                name="Current_title"
                id="postTitle"
                placeholder={title}
                onChange={(e) => setCurrent_title(e.target.value)}
                value={Current_title}
                // onChange={(e) => setTitle(e.target.value)}
                required
              />
              {errors.Current_title && <small className="text-danger"><i>{errors.Current_title}</i></small>}
            </div>

            {/* Details Textarea */}
            <div className="mb-3">
              <label className="form-label">
                Details About Your Post <span className="text-danger">*</span>
              </label>
              <textarea
                className={`form-control ${errors.Current_detail ? 'general-country-border' : ''}`}
                name="Current_detail"
                rows="4"
                id="postDetails"
                placeholder={details}
                onChange={(e) => setCurrent_detail(e.target.value)}
                value={Current_detail}
                // value={details}
                // onChange={(e) => setDetails(e.target.value)}
                required
              ></textarea>
              {errors.Current_detail && <small className="text-danger"><i>{errors.Current_detail}</i></small>}
            </div>

            {/* Upload Box */}
            {/* <div className="mb-4">
              <label className="form-label">Add File To Your Post</label>
              <div className="upload-box">
                <strong>Click to upload<br />or Drag and Drop</strong>
                <div className="text-muted mt-2">PNG, JPG, SVG, WEBP or PDF</div>
                <input type="file" />
              </div>
            </div> */}

            <div className="d-flex flex-column align-items-start justify-content-start mt-3 w-100">
              <label for="website">Add File To Your Post</label>
              <div className="d-flex align-items-start justify-content-start gap-3 w-100 mt-3 flex-wrap">
                <DragAndDrop
                  accept={{
                    'image/png': [],
                    'image/jpeg': [],
                    'image/jpg': [],
                    'image/webp': [],
                    'image/svg+xml': [],
                    'application/pdf': [],
                  }}
                  name="banner"
                  onFileDrop={handleFileDrop_banner}
                  className="image-div-das-image-upload-banner"
                  label={
                    <>
                      <IoCloudUploadOutline className="fs-2 mb-3" />
                      <p><b>Click to upload</b> or drag and drop</p>
                      <p style={{ fontSize: '12px' }}>SVG, PNG, JPG, WEBP, MP4</p>
                    </>
                  }
                />

                {selectedImages_banner.map((preview, index) => {
                  const file = selectedFiles_banner[index];

                  return (
                    <div key={index} className="position-relative image-div-das-image-baner-outer-div">
                      {file.type === 'application/pdf' ? (
                        <iframe
                          src={preview}
                          className="image-div-das-image-banner"
                          title={`PDF Preview ${index}`}
                        />
                      ) : (
                        <img
                          src={preview}
                          alt={`Selected ${index}`}
                          className="image-div-das-image-banner"
                        />
                      )}

                      <RxCross2
                        style={{
                          cursor: 'pointer',
                          fontSize: '20px',
                          position: 'absolute',
                          top: '5px',
                          right: '5px',
                          background: 'white',
                          borderRadius: '50%',
                        }}
                        onClick={() => handleRemoveBanner(index)}
                      />
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Buttons */}
            <div className="text-end ">
              <button type="submit" className="save-button das-button-end me-1" onClick={handleSubmit}>Submit</button>
              <button type="reset" className="cancel-button das-button-end ms-1">Cancel</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Das_newPost;