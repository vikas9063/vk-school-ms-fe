import React, { useEffect, useState } from "react";
import { useParams } from "react-router"; // useRouter → useRouterDom
import AxiosUtil from "../../../utils/AxiosUtils";
import InstituteDetailsCard from "./InstituteDetailCard";
import { Spinner } from "flowbite-react";
import HeadingBar from "../../../components/HeadingBar";
import HeadingComponent from "../../../components/HeadingComponent";

const ViewInstituteDetails = () => {
  const { instituteId } = useParams();
  const [institute, setInstitute] = useState(null);
  const [loading, setLoading] = useState(true);

  const getInstituteDetails = async (id) => {
    try {
      const res = await AxiosUtil.get(`/school/get-by-id/${id}`);
      setInstitute(res?.result); // Adjust if your response structure is different
    } catch (err) {
      console.error("Failed to fetch institute details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (instituteId) {
      getInstituteDetails(instituteId);
    }
  }, [instituteId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spinner  color="purple"/>
      </div>
    );
  }

  if (!institute) {
    return (
      <div className="text-center text-red-500">
        Institute not found or an error occurred.
      </div>
    );
  }

  return (
    <div className="p-4">
      <HeadingBar />
      <HeadingComponent heading="Institute Details" />
      <InstituteDetailsCard data={institute} />
    </div>
  );
};

export default ViewInstituteDetails;
