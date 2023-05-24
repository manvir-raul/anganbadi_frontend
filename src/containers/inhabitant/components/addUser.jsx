import React, { useState } from "react";
import ModalBasic from "../../../components/modal/templates/ModalBasic";
import { useForm, Controller } from "react-hook-form";
import Input from "../../../components/form/input";
import DropdownFull from "../../../components/form/dropdown";
import Api from "../../../utils/api";

const AddInhabitantModel = ({ modalData, setModalData, setValue }) => {
  const { isOpen, name } = modalData;
  const { register, handleSubmit, control, reset } = useForm({});
  const onSubmit = async (data) => {
    const { gender: { value: gender_value } = {} } = data;
    try {
      const res = await Api.post("/inhabitant/add", {
        ...data,
        gender: gender_value,
      });
      if (res) {
        const { data: { inhabitant = {} } = {} } = res;
        setModalData({ name: "", isOpen: false });
        setValue(name, { label: inhabitant.name, value: inhabitant._id });
      }
    } catch (error) {
      setModalData({ name: "", isOpen: false });
      dispatch(openErrorModal({ isOpen: true, message: error.message }));
    }
  };
  return (
    <ModalBasic
      id="feedback-modal"
      modalOpen={isOpen}
      setModalOpen={() => setModalData({ name: "", isOpen: false })}
      title="Add Inhabitant"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-5 py-4">
          <div className="text-sm"></div>
          <div className="space-y-3">
            <div>
              <Input label="Name" register={register} name="name" />
            </div>
            <div>
              <Input
                label="Adhar Card"
                register={register}
                type="number"
                name="adhar_card"
              />
            </div>
            <div>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <DropdownFull
                    field={field}
                    label="Gender"
                    options={[
                      { value: 0, label: "Male" },
                      { value: 1, label: "Female" },
                      { value: 2, label: "Others" },
                    ]}
                  />
                )}
              />
            </div>
          </div>
        </div>
        {/* Modal footer */}
        <div className="px-5 py-4 border-t border-slate-200">
          <div className="flex flex-wrap justify-end space-x-2">
            <button
              className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
              onClick={(e) => {
                setModalData({ name: "", isOpen: false });
              }}
            >
              Cancel
            </button>
            <button
              className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
              type="submit"
            >
              save
            </button>
          </div>
        </div>
      </form>
    </ModalBasic>
  );
};

export default AddInhabitantModel;
