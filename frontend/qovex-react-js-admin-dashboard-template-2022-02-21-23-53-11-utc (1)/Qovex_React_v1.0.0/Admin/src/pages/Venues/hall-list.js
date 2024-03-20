import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Col, Row, Table, Button } from "reactstrap";
import Select from 'react-select';
import "./halls.css";
import axios from "axios";
import * as XLSX from 'xlsx';

const axiosAPI = axios.create();

const TasksList = () => {
  const [hallCount, setHallCount] = useState(12); // Number of rows
  const [selectedCourses, setSelectedCourses] = useState(Array(hallCount).fill('')); // State to keep track of selected courses
  const [selectedMentors, setSelectedMentors] = useState(Array(hallCount).fill('')); // State to keep track of selected mentors
  const [formData, setFormData] = useState(Array(hallCount).fill({ course: '', count: '', mentor: '', slot: '', days: [] }));
  const [backendData, setBackendData] = useState([]);

  const handleCourseChange = (index, value) => {
    const updatedSelectedCourses = [...selectedCourses];
    updatedSelectedCourses[index] = value;
    setSelectedCourses(updatedSelectedCourses);
    updateFormData(index, { ...formData[index], course: value });
  };

  const handleMentorChange = (index, value) => {
    const updatedSelectedMentors = [...selectedMentors];
    updatedSelectedMentors[index] = value;
    setSelectedMentors(updatedSelectedMentors);
    updateFormData(index, { ...formData[index], mentor: value });
  };

  const handleCountChange = (index, value) => {
    updateFormData(index, { ...formData[index], count: value });
  };

  const handleSlotChange = (index, value) => {
    updateFormData(index, { ...formData[index], slot: value });
  };

  const handleDayChange = (index, selectedDays) => {
    updateFormData(index, { ...formData[index], days: selectedDays });
  };

  const updateFormData = (index, newData) => {
    const updatedFormData = [...formData];
    updatedFormData[index] = newData;
    setFormData(updatedFormData);
  };

  const handleSubmit = async (index) => {
    const hallNames = [
      "Hall_2.1", "Hall_2.2", "Bay1", "Bay2", "Bay3", "Bay4",
      "Bay5", "Hall_4.1", "Hall_4.2", "Hall_5.1", "Hall_5.2", "Hall_5.3"
    ];

    const hallName = hallNames[index];
    const formDataWithHallName = { ...formData[index], hallName };

    await axiosAPI.post("http://localhost:8000/api/add-halldata", formDataWithHallName)
      .then((response) => {
        console.log(response.data);
        console.log("data added");
      }).catch((error) => {
        console.log(error);
      })

    console.log("Form submitted for", formDataWithHallName);
    // alert("Form successfully submitted for "${hallName});
    alert(`Form successfully submitted for ${hallName}`);
  };

  useEffect(async () => {
    await axiosAPI.get("http://localhost:8000/api/get-halldata")
      .then((result) => {
        console.log(result.data);
        setBackendData(result.data);
      }).catch((error) => {
        console.log(error);
      })
  }, []);

  const downloadExcel = (user) => {
    console.log(user); 
    const filename = "userShopData";
    const ws = XLSX.utils.json_to_sheet(user);
    const wb = XLSX.utils.book_new(); 
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1"); 
    // Save the Excel file 
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };



    return (
      <React.Fragment>
        <div className="center-card">
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Hall Details</CardTitle>
                  <Table bordered>
                    <thead className=" table-header-light-grey">
                      <Button color="primary" onClick={() => downloadExcel(backendData)}>
                        Download Excel
                      </Button>
                      <tr>
                        <th>Hall Name</th>
                        <th>Course</th>
                        <th>Count</th>
                        <th>Mentors</th>
                        <th>Slot</th>
                        <th>Day</th>
                        <th>Submit</th>

                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(hallCount)].map((_, index) => (
                        <tr key={index}>
                          <td>
                            {index === 0 && "Hall_2.1"}
                            {index === 1 && "Hall_2.2"}
                            {index === 2 && "Bay1"}
                            {index === 3 && "Bay2"}
                            {index === 4 && "Bay3"}
                            {index === 5 && "Bay4"}
                            {index === 6 && "Bay5"}
                            {index === 7 && "Hall_4.1"}
                            {index === 8 && "Hall_4.2"}
                            {index === 9 && "Hall_5.1"}
                            {index === 10 && "Hall_5.2"}
                            {index === 11 && "Hall_5.3"}
                          </td>
                          <td>
                            <select
                              className="form-control"
                              onChange={(e) => handleCourseChange(index, e.target.value)}
                              value={selectedCourses[index]}
                            >
                              <option value="" disabled hidden>Select Course</option>
                              {[
                                "Fullstack", "React", "AWS", "Flutter", "Azzure_devops",
                                "Salesforce", "AIML"
                              ].filter(course => !selectedCourses.includes(course) || selectedCourses[index] === course).map(course => (
                                <option key={course} value={course}>{course}</option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              value={formData[index].count}
                              onChange={(e) => handleCountChange(index, e.target.value)}
                            />
                          </td>
                          <td>

                            <select
                              className="form-control"
                              onChange={(e) => handleMentorChange(index, e.target.value)}
                              value={selectedMentors[index]}
                            >
                              <option value="" disabled hidden>Select Mentor</option>
                              {[
                                "Simha", "NDP", "JDP", "Hanumanth",
                                "veerababu", "Rajachowdary", "Rajesh", "Pavan Teja"
                              ].filter(mentor => !selectedMentors.includes(mentor) || selectedMentors[index] === mentor).map(mentor => (
                                <option key={mentor} value={mentor}>{mentor}</option>
                              ))}
                            </select>

                          </td>
                          <td>
                            <select
                              className="form-control"
                              onChange={(e) => handleSlotChange(index, e.target.value)}
                            >
                              <option value="" disabled selected hidden>Select Slot</option>
                              <option value="FN">FN</option>
                              <option value="AN">AN</option>
                              <option value="FULL">FULL</option>
                            </select>
                          </td>
                          <td>
                            <Select
                              isMulti
                              className="basic-multi-select"
                              classNamePrefix="select"
                              options={[
                                { value: "Mon", label: "Mon" },
                                { value: "Tue", label: "Tue" },
                                { value: "Wed", label: "Wed" },
                                { value: "Thu", label: "Thu" },
                                { value: "Fri", label: "Fri" },
                                { value: "Sat", label: "Sat" }
                              ]}
                              onChange={(selectedDays) => handleDayChange(index, selectedDays)}
                            />
                          </td>
                          <td>
                            <Button
                              color="primary"
                              onClick={() => handleSubmit(index)}
                              className="submit-btn"
                            >
                              Submit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>

        </div>
      </React.Fragment>
    );
  };

  export default TasksList;