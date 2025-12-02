import React, { useState } from "react";

const LanguageDropdown = () => {
  const [open, setOpen] = useState(false);

  const languages = [

    {
      code: "en",
      label: "English",
      flag: "/Images/united-states-of-america.png"
    },
    {
      code: "tr",
      label: "Turkey",
      flag: "/Images/turkey.png"
    },
    {
      code: "de",
      label: "Germany",
      flag: "/Images/germany.png"
    }
  ];

  const [selected, setSelected] = useState(languages[0]);

  return (
    <div className="dropdown ml-3">
      <button
        className="btn text-light d-flex align-items-center gap-2"
        onClick={() => setOpen(!open)}
      >
        <img src={selected.flag} alt="" width="30px" />
        <span>{selected.label}</span>
      </button>

      {open && (
        <ul className="dropdown-menu show mt-1 p-0" style={{ display: "block" }}>
          {languages.map((lang) => (
            <li
              key={lang.code}
              className="dropdown-item bg-light d-flex align-items-center gap-2 pe-2"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSelected(lang);
                setOpen(false);
              }}
            >
              <img src={lang.flag} alt="" width="30px" />
              <span>{lang.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageDropdown;
