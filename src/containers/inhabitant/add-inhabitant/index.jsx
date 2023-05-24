import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import Checkbox from "../../../components/form/checkbox";
import Datepicker from "../../../components/form/datepicker";
import DropdownFull from "../../../components/form/dropdown";
import Input from "../../../components/form/input";
// import Tooltip from "../../../components/Tooltip/Tooltip";
import Api from "../../../utils/api";
import { openErrorModal } from "../../../redux/reducers/common";
import AddInhabitantModel from "../components/addUser";
import { validObjectWithKeys, validValue } from "../../../utils/commonUtils";

const genderOptions = [
  { value: 0, label: "Male" },
  { value: 1, label: "Female" },
  { value: 2, label: "Others" },
];

const casteOptions = [
  { value: 0, label: "General" },
  { value: 1, label: "BC" },
  { value: 2, label: "SC" },
];

const pensionTypeOptions = [
  { value: 0, label: "Old Age" },
  { value: 1, label: "Widow" },
  { value: 2, label: "handicapt(dependent)" },
  { value: 3, label: "handicapt(independent)" },
];

const AddInhabitant = () => {
  const [modalData, setModalData] = useState({ name: "", isOpen: false });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { inhabitantID } = useParams();

  const { register, handleSubmit, control, reset, setValue } = useForm({});

  const getOptionValue = (options, val) => {
    if (validValue(val)) {
      const option = options.find(({ value }) => value === val);
      if (validObjectWithKeys(option, ["value", "label"])) {
        return option;
      }
    }
  };

  const setInitialdata = (data) => {
    const {
      gender,
      caste,
      pension_type,
      father = {},
      mother = {},
      spouse = {},
    } = data;
    const initialData = {
      ...data,
      gender: getOptionValue(genderOptions, gender),
      caste: getOptionValue(casteOptions, caste),
      pension_type: getOptionValue(pensionTypeOptions, pension_type),
      father_name: { value: father._id, label: father.name },
      mother_name: { value: mother._id, label: mother.name },
      spouse_name: { value: spouse._id, label: spouse.name },
    };
    reset(initialData);
  };

  const getData = async () => {
    try {
      const res = await Api.get(`/inhabitant/detail/${inhabitantID}`);

      setInitialdata(res.data.inhabitant);
    } catch (error) {
      dispatch(openErrorModal({ isOpen: true, message: error.message }));
    }
  };

  useEffect(() => {
    if (inhabitantID) getData();
  }, [inhabitantID]);

  const getValue = (selected) => {
    if (validObjectWithKeys(selected, ["value"])) {
      return selected.value;
    }
  };

  const onSubmit = async (data) => {
    const {
      gender,
      caste,
      father_name,
      mother_name,
      spouse_name,
      pension_type,
    } = data;

    const sentData = {
      ...data,
      gender: getValue(gender),
      caste: getValue(caste),
      father_name: getValue(father_name),
      mother_name: getValue(mother_name),
      spouse_name: getValue(spouse_name),
      pension_type: getValue(pension_type),
    };
    console.log("data", data);
    console.log("sentData", sentData);

    try {
      if (inhabitantID) {
        const res = await Api.put(
          `/inhabitant/update/${inhabitantID}`,
          sentData
        );
        if (res) {
          navigate(`/inhabitant/${inhabitantID}`);
        }
      } else {
        const res = await Api.post("/inhabitant/add", sentData);
        if (res) {
          navigate("/inhabitant/list");
        }
      }
    } catch (error) {
      dispatch(openErrorModal({ isOpen: true, message: error.message }));
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <AddInhabitantModel
        modalData={modalData}
        setModalData={setModalData}
        setValue={setValue}
      />
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
          {`${inhabitantID ? "Edit" : "Add"} Inhabitant`}
        </h1>
      </div>
      <div className="border-t border-slate-200">
        {/* Components */}
        <div className="space-y-8 mt-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-5 md:grid-cols-3">
              <Input label="Name" register={register} name="name" />
              <Input
                label="Adhar Card"
                register={register}
                type="number"
                name="adhar_card"
              />
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <DropdownFull
                    field={field}
                    label="Gender"
                    options={genderOptions}
                  />
                )}
              />

              <Input
                label="Family Number"
                register={register}
                type="number"
                name="family_number"
              />
              <Input
                label="Family Head"
                register={register}
                name="family_head"
              />
              <Input
                label="Relation With Head"
                register={register}
                name="relation_with_head"
              />
              <Controller
                name="father_name"
                control={control}
                render={({ field }) => (
                  <DropdownFull
                    field={field}
                    label="Father Name"
                    api="inhabitant/lookup"
                    onSelect={(val) => {
                      return (
                        !val.value &&
                        setModalData({ isOpen: true, name: "father_name" })
                      );
                    }}
                  />
                )}
              />
              <Controller
                name="mother_name"
                control={control}
                render={({ field }) => (
                  <DropdownFull
                    field={field}
                    label="Mother Name"
                    api="inhabitant/lookup"
                    onSelect={(val) => {
                      return (
                        !val.value &&
                        setModalData({ isOpen: true, name: "mother_name" })
                      );
                    }}
                  />
                )}
              />
              <Controller
                name="spouse_name"
                control={control}
                render={({ field }) => (
                  <DropdownFull
                    field={field}
                    label="Spouse Name"
                    api="inhabitant/lookup"
                    onSelect={(val) => {
                      return (
                        !val.value &&
                        setModalData({ isOpen: true, name: "spouse_name" })
                      );
                    }}
                  />
                )}
              />
              <Controller
                name="caste"
                control={control}
                render={({ field }) => (
                  <DropdownFull
                    field={field}
                    label="Caste"
                    options={casteOptions}
                  />
                )}
              />
              <Input label="Bank Name" register={register} name="bank_name" />
              <Input
                label="Account Number"
                register={register}
                type="number"
                name="bank_account_number"
              />
              <Input
                label="IFSC Code"
                register={register}
                name="bank_ifsc_code"
              />
              <Controller
                name="marital_status"
                control={control}
                render={({ field }) => (
                  <Checkbox field={field} label="Married" />
                )}
              />
              <Controller
                name="date_of_birth"
                control={control}
                render={({ field }) => (
                  <Datepicker field={field} label="Date of Birth" />
                )}
              />
              <Input label="Age" register={register} name="age" />
              <Input label="Pan Card" register={register} name="pan_card" />
              <Controller
                name="is_pensioner"
                control={control}
                render={({ field }) => (
                  <Checkbox field={field} label="Pensioner" />
                )}
              />
              <Input
                label="Pension Number"
                register={register}
                name="pension_number"
              />
              <Controller
                name="pension_type"
                control={control}
                render={({ field }) => (
                  <DropdownFull
                    label="Pension Type"
                    field={field}
                    options={pensionTypeOptions}
                  />
                )}
              />
            </div>
            <div className="m-1.5 w-full flex justify-items-center">
              {/* Start */}
              <button
                className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                type="submit"
              >
                Button
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddInhabitant;
