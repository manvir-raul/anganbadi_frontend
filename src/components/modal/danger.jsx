import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import store from "store2";
import ModalBlank from "../ModalBlank";
import { openErrorModal } from "../../redux/reducers/common";
import { resetUser } from "../../redux/reducers/user";
import {
  strictValidString,
  validObjectWithKeys,
} from "../../utils/commonUtils";

const tokenErrorMessage = [
  "Invalid token.",
  "Access denied. No token provided.",
];

const DangerModal = () => {
  const errorModal = useSelector((state) => state.common.errorModal);
  const dispatch = useDispatch();
  return (
    <ModalBlank
      id="danger-modal"
      modalOpen={errorModal.isOpen}
      setModalOpen={(val) =>
        dispatch(openErrorModal({ isOpen: false, message: null }))
      }
    >
      <div className="p-5 flex space-x-4 flex-col items-center justify-center">
        {/* Icon */}
        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-100">
          <svg
            className="w-4 h-4 shrink-0 fill-current text-rose-500"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
          </svg>
        </div>
        {/* Content */}
        <div>
          <div className="text-lg font-semibold text-slate-800 mb-10 space-y-2">
            <p>
              {validObjectWithKeys(errorModal, ["message"]) &&
              strictValidString(errorModal.message)
                ? errorModal.message
                : "Something went wrong!"}
            </p>
          </div>
          <div className="flex flex-wrap  space-x-2 items-center justify-center">
            <button
              className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
              onClick={() => {
                if (
                  tokenErrorMessage.some((msg) => msg === errorModal.message)
                ) {
                  store.set("accessToken", null);
                  dispatch(resetUser());
                }
                dispatch(
                  openErrorModal({
                    isOpen: false,
                    message: "",
                  })
                );
              }}
            >
              close
            </button>
          </div>
        </div>
      </div>
    </ModalBlank>
  );
};

export default DangerModal;
