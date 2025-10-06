import React, { useEffect, useState } from "react";
import { LiaBuysellads } from "react-icons/lia";
import { LiaSellcast } from "react-icons/lia";
import { MdOutlineEmojiTransportation } from "react-icons/md";
import { GiLinkedRings } from "react-icons/gi";
const Das_newPost = () => {
  const [postType, setPostType] = useState('buying');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form submitted');
  };

  return (
    <div className="add-post-wrapper text-start">
      <div className="">
        <h5 className="mb-4">New Post</h5>
        <div className="das-general-form">
          <form onSubmit={handleSubmit} >
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
                  <span><LiaBuysellads/> Buying Post</span>
                </label>
                <label
                  className={`post-tab ${postType === 'selling' ? 'active' : ''} flex-fill text-center shadow`}
                  data-type="selling"
                  onClick={() => handleTabClick('selling')}
                >
                  <input type="radio" name="postType" checked={postType === 'selling'} readOnly />
                  <span><LiaSellcast/> Selling Offer</span>
                </label>
                <label
                  className={`post-tab ${postType === 'cooperation' ? 'active' : ''} flex-fill text-center shadow`}
                  data-type="cooperation"
                  onClick={() => handleTabClick('cooperation')}
                >
                  <input type="radio" name="postType" checked={postType === 'cooperation'} readOnly />
                  <span><GiLinkedRings/> Cooperation</span>
                </label>
                <label
                  className={`post-tab ${postType === 'transport' ? 'active' : ''} flex-fill text-center shadow`}
                  data-type="transport"
                  onClick={() => handleTabClick('transport')}
                >
                  <input type="radio" name="postType" checked={postType === 'transport'} readOnly />
                  <span> <MdOutlineEmojiTransportation/> Transportation</span>
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
                className="form-control"
                id="postTitle"
                placeholder={title}
                // onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Details Textarea */}
            <div className="mb-3">
              <label className="form-label">
                Details About Your Post <span className="text-danger">*</span>
              </label>
              <textarea
                className="form-control"
                rows="4"
                id="postDetails"
                placeholder={details}
                // value={details}
                // onChange={(e) => setDetails(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Upload Box */}
            <div className="mb-4">
              <label className="form-label">Add File To Your Post</label>
              <div className="upload-box">
                <strong>Click to upload<br />or Drag and Drop</strong>
                <div className="text-muted mt-2">PNG, JPG, SVG, WEBP or PDF</div>
                <input type="file" />
              </div>
            </div>

            {/* Buttons */}
            <div className="text-end ">
              <button type="submit" className="save-button das-button-end me-1">Submit</button>
              <button type="reset" className="cancel-button das-button-end ms-1">Cancel</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Das_newPost;