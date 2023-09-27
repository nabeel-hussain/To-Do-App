import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCheckbox,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBTooltip,
} from "mdb-react-ui-kit";
const AddToDoTask: React.FC = () => {
   return (
      <>
         <MDBContainer className="py-5">
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol>
          <MDBCard
            id="list1"
            style={{ borderRadius: ".75rem", backgroundColor: "#eff1f2" }}
          >
            <MDBCardBody className="py-4 px-4 px-md-5">
              <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                <MDBIcon fas icon="check-square" className="me-1" />
                <u>My Todo-s</u>
              </p>
              <div className="pb-2">
                <MDBCard>
                  <MDBCardBody>
                    <div className="d-flex flex-row align-items-center">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="exampleFormControlInput1"
                        placeholder="Add new..."
                      />
                      <MDBTooltip
                        tag="a"
                        wrapperProps={{ href: "#!" }}
                        title="Set due date"
                      >
                        <MDBIcon
                          fas
                          icon="calendar-alt"
                          size="lg"
                          className="me-3"
                        />
                      </MDBTooltip>
                      <div>
                        <MDBBtn>Add</MDBBtn>
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </div>
              <hr className="my-4" />

              <div className="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
                <p className="small mb-0 me-2 text-muted">Filter</p>
               
                <MDBTooltip
                  tag="a"
                  wrapperProps={{ href: "#!" }}
                  title="Ascending"
                >
                  <MDBIcon
                    fas
                    icon="sort-amount-down-alt"
                    className="ms-2"
                    style={{ color: "#23af89" }}
                  />
                </MDBTooltip>
              </div>
              <MDBListGroup horizontal className="rounded-0 bg-transparent">
                <MDBListGroupItem className="d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckChecked"
                    defaultChecked
                  />
                </MDBListGroupItem>
                <MDBListGroupItem className="px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                  {" "}
                  <p className="lead fw-normal mb-0">
                    Buy groceries for next week
                  </p>
                </MDBListGroupItem>
                <MDBListGroupItem className="ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                  <div className="d-flex flex-row justify-content-end mb-1">
                    <MDBTooltip
                      tag="a"
                      wrapperProps={{ href: "#!" }}
                      title="Edit todo"
                    >
                      <MDBIcon
                        fas
                        icon="pencil-alt"
                        className="me-3"
                        color="info"
                      />
                    </MDBTooltip>
                    <MDBTooltip
                      tag="a"
                      wrapperProps={{ href: "#!" }}
                      title="Delete todo"
                    >
                      <MDBIcon fas icon="trash-alt" color="danger" />
                    </MDBTooltip>
                  </div>
                  <div className="text-end text-muted">
                    <MDBTooltip
                      tag="a"
                      wrapperProps={{ href: "#!" }}
                      title="Created date"
                    >
                      <p className="small text-muted mb-0">
                        <MDBIcon fas icon="info-circle" className="me-2" />
                        28th Jun 2020
                      </p>
                    </MDBTooltip>
                  </div>
                </MDBListGroupItem>
              </MDBListGroup>
              <MDBListGroup horizontal className="rounded-0 bg-transparent">
                <MDBListGroupItem className="d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                  <MDBCheckbox name="flexCheck" value="" id="flexCheck" />
                </MDBListGroupItem>
                <MDBListGroupItem className="px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                  {" "}
                  <p className="lead fw-normal mb-0">Renew car insurance</p>
                </MDBListGroupItem>
                <MDBListGroupItem className="px-3 py-1 d-flex align-items-center border-0 bg-transparent">
                  <div className="py-2 px-3 me-2 border border-warning rounded-3 d-flex align-items-center bg-light">
                    <p className="small mb-0">
                      <MDBTooltip
                        tag="a"
                        wrapperProps={{ href: "#!" }}
                        title="Due on date"
                      >
                        <MDBIcon
                          fas
                          icon="hourglass-half"
                          color="warning"
                          className="me-2"
                        />
                      </MDBTooltip>
                      28th Jun 2020
                    </p>
                  </div>
                </MDBListGroupItem>
                <MDBListGroupItem className="ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                  <div className="d-flex flex-row justify-content-end mb-1">
                    <MDBTooltip
                      tag="a"
                      wrapperProps={{ href: "#!" }}
                      title="Edit todo"
                    >
                      <MDBIcon
                        fas
                        icon="pencil-alt"
                        className="me-3"
                        color="info"
                      />
                    </MDBTooltip>
                    <MDBTooltip
                      tag="a"
                      wrapperProps={{ href: "#!" }}
                      title="Delete todo"
                    >
                      <MDBIcon fas icon="trash-alt" color="danger" />
                    </MDBTooltip>
                  </div>
                  <div className="text-end text-muted">
                    <MDBTooltip
                      tag="a"
                      wrapperProps={{ href: "#!" }}
                      title="Created date"
                    >
                      <p className="small text-muted mb-0">
                        <MDBIcon fas icon="info-circle" className="me-2" />
                        28th Jun 2020
                      </p>
                    </MDBTooltip>
                  </div>
                </MDBListGroupItem>
              </MDBListGroup>
              <MDBListGroup horizontal className="rounded-0 bg-transparent">
                <MDBListGroupItem className="d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                  <MDBCheckbox name="flexCheck" value="" id="flexCheck" />
                </MDBListGroupItem>
                <MDBListGroupItem className="px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                  {" "}
                  <p className="lead fw-normal mb-0 bg-light w-100 ms-n2 ps-2 py-1 rounded">
                    Sign up for online course
                  </p>
                </MDBListGroupItem>
                <MDBListGroupItem className="ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                  <div className="d-flex flex-row justify-content-end mb-1">
                    <MDBTooltip
                      tag="a"
                      wrapperProps={{ href: "#!" }}
                      title="Delete todo"
                    >
                      <MDBIcon fas icon="trash-alt" color="danger" />
                    </MDBTooltip>
                  </div>
                  <div className="text-end text-muted">
                    <MDBTooltip
                      tag="a"
                      wrapperProps={{ href: "#!" }}
                      title="Created date"
                    >
                      <p className="small text-muted mb-0">
                        <MDBIcon fas icon="info-circle" className="me-2" />
                        28th Jun 2020
                      </p>
                    </MDBTooltip>
                  </div>
                </MDBListGroupItem>
              </MDBListGroup>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
      </>
   );
};
export default AddToDoTask;
