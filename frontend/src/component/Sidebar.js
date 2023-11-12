import React, {useState} from 'react';
import axios from 'axios';
import {Menu, MenuItem, Sidebar, SubMenu} from 'react-pro-sidebar';

const DeptEmpTree = () => {
  const [deptName, setDeptName] = useState('');
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchEmployees = async (selectedDept) => {
    try {
      const response = await axios.get(`/api/emp/tree?deptName=${selectedDept}`);
      setEmployees(response.data.employees);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleDeptClick = (selectedDept) => {
    setDeptName(selectedDept);
    fetchEmployees(selectedDept);
    setOpen(true);
  };

  const toggleSubMenu = () => {
    setOpen(!open);
  };

  return (
      <div>
        <Sidebar>
          <Menu>
            <SubMenu title="부서 목록" onClick={toggleSubMenu} style={{color: 'black'}}>
              {open && (
                  <>
                    <MenuItem onClick={() => handleDeptClick('인사부')}
                              style={{color: 'black'}}>
                      인 사 부
                    </MenuItem>
                    <MenuItem onClick={() => handleDeptClick('재무부')}
                              style={{color: 'black'}}>
                      재 무 부
                    </MenuItem>
                    <MenuItem onClick={() => handleDeptClick('콘텐츠관리부')}
                              style={{color: 'black'}}>
                      콘텐츠관리부
                    </MenuItem>
                    <MenuItem onClick={() => handleDeptClick('회원관리부')}
                              style={{color: 'black'}}>
                      회원관리부
                    </MenuItem>
                  </>
              )}
            </SubMenu>
          </Menu>

          {open && deptName && (
              <div style={{marginLeft: '50px'}}>
                <h3>{deptName}</h3>
                <ul>
                  {employees.map(employee => (
                      <li key={employee.empId}>{employee.empName}</li>
                  ))}
                </ul>
              </div>
          )}
        </Sidebar>
      </div>
  );
};

export default DeptEmpTree;