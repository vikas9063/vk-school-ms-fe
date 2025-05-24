import { useEffect, useState } from "react";
import AxiosUtil from "../../../utils/AxiosUtils";
import PaginationComponent from "../../../components/PaginationComponent";
import HeadingBar from "../../../components/HeadingBar";
import { Badge, Card, Spinner } from "flowbite-react";
import HeadingComponent from "../../../components/HeadingComponent";
import { useNavigate } from "react-router";
import SearchSortBar from "../../../components/SearchSortBar";

// SchoolCard component
function SchoolCard({ data }) {
  if (!data) return null;
  const navigate = useNavigate();
  const handleCardClick = (schoolId) => {
    navigate(`/auth/general-settings/view-institute-details/${schoolId}`);
  }

  return (
    <div className="max-w-sm mx-auto">
      <Card
        imgAlt={`${data.schoolName} image`}
        imgSrc="https://www.insightacademy.in/assets/img/best-school-bangalore.jpeg" className="cursor-pointer h-[550px]" onClick={() => handleCardClick(data?.schoolId)}
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {data.schoolName}
        </h5>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          School Code: <span className="font-medium">{data.schoolCode}</span>
        </p>

        <p className="font-normal text-gray-700 dark:text-gray-300 mb-3">
          {data.schoolDesc || "No description available."}
        </p>

        <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
          {data.phoneNo && (
            <p>
              📞 <strong>Phone:</strong> {data.phoneNo}
            </p>
          )}
          {data.emailId && (
            <p>
              📧 <strong>Email:</strong> {data.emailId}
            </p>
          )}
          {data.city || data.state || data.country ? (
            <p>
              📍 <strong>Location:</strong>{" "}
              {[data.city, data.state, data.country].filter(Boolean).join(", ")}
            </p>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge color={data.active ? "success" : "failure"}>
            {data.active ? "Active" : "Inactive"}
          </Badge>
          <Badge color={data.enabled ? "info" : "warning"}>
            {data.enabled ? "Enabled" : "Disabled"}
          </Badge>
        </div>
      </Card>
    </div>
  );
}

const InstituteProfile = () => {
  const [schools, setSchools] = useState([]);
  const [pagination, setPagination] = useState({
    pageNo: 0,
    pageSize: 10,
    totalPages: 0,
    totalElements: 0,
  });
  const [loading, setLoading] = useState(false);

  const [urlConfig, setUrlConfig] = useState({
    type: "ALL",
    pageNo: 0,
    pageSize: 10,
    sortBy: "schoolName",
    sortDir: "asc",
  });

  const getSchools = async () => {
    const { type, pageNo, pageSize, sortBy, sortDir } = urlConfig;
    setLoading(true);
    try {
      const res = await AxiosUtil.get(
        `/school/get-all?type=${type}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
      );

      if (res.status === "SUCCESS") {
        setSchools(res.result.content || []);
        setPagination({
          pageNo: res.result.pageNo,
          pageSize: res.result.pageSize,
          totalPages: res.result.totalPages,
          totalElements: res.result.totalElements,
        });
      } else {
        setSchools([]);
      }
    } catch (error) {
      console.error("Error fetching schools:", error);
      setSchools([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSchools();
  }, [urlConfig]);

  const handlePageChange = (newPage) => {
    setUrlConfig((prev) => ({ ...prev, pageNo: newPage }));
  };

  const sortOptions = [
    { label: "School Name", value: "schoolName" },
    { label: "School Code", value: "schoolCode" },
    { label: "Phone No", value: "phoneNo" },
    { label: "Email Id", value: "emailId" },
    { label: 'Created On', value: "createdOn" }
  ];

  const handleSearch = (query) => {
    // Update state or refetch API
      console.log("Query : ",query);
      
  };

const handleSortChange = ({ field, direction }) => {
  setUrlConfig((prev) => ({
    ...prev,
    sortBy: field,
    sortDir: direction,
  }));
};


  return (
    <div className="p-4 w-full bg-white">
      <HeadingBar />
      <HeadingComponent heading={"Institute Details"} btnText={"Add Institute"} btnLink="/auth/general-settings/add-institute-details" />
      <SearchSortBar
        onSearch={handleSearch}
        onSortChange={handleSortChange}
        sortOptions={sortOptions}
      />
      <div className="min-h-[60vh]">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Spinner size="xl" color="purple" />
          </div>
        ) : schools.length === 0 ? (
          <p className="text-center text-gray-600">No schools available.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {schools.map((school) => (
              <SchoolCard key={school.schoolId} data={school} />
            ))}
          </div>
        )}
      </div>


      {pagination.totalPages > 1 && (
        <PaginationComponent
          currentPage={pagination.pageNo}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default InstituteProfile;
