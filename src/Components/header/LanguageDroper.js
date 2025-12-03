import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDroper_open } from "../../redux/Close_droper";

const LanguageDropdown = () => {
  // const Droper_open = useSelector((state) => state.Droper_open.selected);
  const [open, setOpen] = useState(false);

  const Droper_open = useSelector((state) => state.droper_open.selected);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Droper_open === false) {
      setOpen(false); // close dropdown
    }
  }, [Droper_open]);

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
    <div className="dropdown ml-3"  onClick={(e) => e.stopPropagation()}>
      <button
        className="btn text-light d-flex align-items-center gap-2"
        onClick={(e) => {
           e.stopPropagation()
          setOpen(!open);
          dispatch(setDroper_open(true))
        }}
      >
        <img src={selected.flag} alt="" width="30px" />
        <span>{selected.label}</span>
      </button>

      {
        open && (
          <ul className="dropdown-menu show mt-1 p-0" style={{ display: "block" }}>
            {languages.map((lang) => (
              <li
                key={lang.code}
                className="dropdown-item bg-light d-flex align-items-center gap-2 pe-2"
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                   e.stopPropagation()
                  setSelected(lang);
                  setOpen(false);
                  dispatch(setDroper_open(false));
                }}
              >
                <img src={lang.flag} alt="" width="30px" />
                <span>{lang.label}</span>
              </li>
            ))}
          </ul>
        )
      }
    </div >
  );
};

export default LanguageDropdown;
