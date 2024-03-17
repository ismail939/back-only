import { useState } from "react";
import { forwardRef, useImperativeHandle } from "react";
function WorkSpaceImages({ photos, updateFields, childRef , ShowError }) {
    const [error, setError] = useState(false);
    const errormessage = "Please select at least 2 valid images, accepted formats are: png, jpg, jpeg";
    function isImage(offerImageName) {
        if (offerImageName.slice(-4) === ".jpg" || offerImageName.slice(-5) === ".jpeg" || offerImageName.slice(-4) === ".png") return true;
        else {
            return false;
        }
    }
    function checkImages() {
        let result = true;
        photos.forEach(image => {
            if (!isImage(image.name)) {
                result = false;
            }
        })
        if (!result || photos.length <= 1) { setError(true); return false; }
        else {
            setError(false);
            return true;
        }
    }
    useImperativeHandle(childRef, () => ({
        checkImages
    }))
    return (
        <>
            <div>
                <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                >
                    WorkSpace Photos
                </label>
                <input
                    type="file"
                    name="offerImage"
                    id="offerImage"
                    multiple
                    className={`bg-gray-50 border ${error ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                    placeholder=""
                    files={photos}
                    accept=".png,.jpg,.jpeg"
                    onChange={(e) => {
                        updateFields({ photos: [...e.target.files] })
                    }}
                ></input>
                <ShowError condition={error } value={errormessage} />
            </div>
        </>
    )
}

export default forwardRef(WorkSpaceImages);