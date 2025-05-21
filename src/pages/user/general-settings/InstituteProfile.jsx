import { useEffect, useState } from "react"
import AxiosUtil from "../../../utils/AxiosUtils";


const InstituteProfile = () => {

  const [schools, setSchools] = useState([]);
  const getSchools = async () => {
    let res = await AxiosUtil.get(`/school/get-all`);
    console.log(res);

  }

  useEffect(() => {
    getSchools();
  }, [])

  return (
    <div>InstituteProfile</div>
  )
}

export default InstituteProfile