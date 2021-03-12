import React, { Component } from "react"
import Photo from "./Photo";
import Modal from 'react-modal';
import Menu from "./Menu"

import { RiFilter3Line as FilterIcon } from "react-icons/ri";
import { FiSearch as SearchIcon, FiChevronDown as DropdownIcon} from "react-icons/fi"
import { RiCloseLine as CancelIcon } from "react-icons/ri"
import { FaHome as SuiteIcon } from "react-icons/fa"
import { FaGraduationCap as MajorIcon } from "react-icons/fa"

const discover = 'discover'
const yourpage = 'yourpage'

class Discover extends Component {
    
    constructor(props) {
        super(props)

        this.isDesktop = props.isDesktop
        this.isMobile = props.isMobile

        this.state = {modalIsOpen: false, page: discover}

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.applyFilters = this.applyFilters.bind(this);

        console.log(this.isDesktop)
    }

    componentDidMount() {
        Modal.setAppElement('body');
    }

    openModal() {
        this.setState({modalIsOpen: true})
    }
    
    afterOpenModal() {
    // references are now sync'd and can be accessed.
        ;
    }
    
    closeModal(){
        this.setState({modalIsOpen: false});
    }

    applyFilters(){
        this.closeModal();
    }

    render() {

        const Banner = () => (
            <p 
                style={{
                    backgroundColor: "#ffbcc4", 
                    padding: "0.5vh", 
                    paddingLeft: "3vw",  
                    paddingRight: "3vw",
                    marginBottom: "-3vh", 
                    borderRadius: "2vh", 
                    marginTop: "1.5vh", 
                    color: "#ef0820"
                }}>
                Closing after virtual graduation (6/14)
            </p>
        )

        //to be used later, focusing on must haves currently. use react-select for drop down
        const FilterBox = () => (
            <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        zIndex: 998,
                      },
                    content : {
                        top: "50%",
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        padding: 0,
                        borderRadius: "1vh",
                        webkitBoxShadow: "0px 20px 38px -18px rgba(0,0,0,0.31)",
                        mozBoxShadow: "0px 20px 38px -18px rgba(0,0,0,0.31)",
                        boxShadow: "0px 20px 38px -18px rgba(0,0,0,0.31)"
                    }
                }}
                contentLabel="Filter Box">
                <div className="flex flex-col justify-around" >
                    <div 
                        className="flex items-center justify-between" 
                        style={{padding: "2vh", color: "#646464"}}>
                        <div>Filters</div>
                        <button onClick={this.closeModal}><CancelIcon/></button>
                    </div>

                    <hr style={{ width: "90vw", color: "#a0a0a0", backgroundColor: "#a0a0a0", height: "1px"}}/>

                    <div style={{width: "100%", padding: "2vh"}}>
                        <div>DORM</div>
                        <div  
                           className = "flex items-center justify-between"
                            style={{
                            width: "100%",
                            height: "5vh", 
                            borderRadius: "0.5vh", 
                            padding: "1vh",
                            lineHeight: "3vh",
                            border: "1.5px #c9c9c9 solid",
                            color: "#848484"
                        }}>
                            <div style={{width: "100%"}}> Casa Italiana </div>
                            <button> <DropdownIcon/> </button>
                        </div>
                    </div>

                    <div style={{width: "100%", padding: "2vh"}}>
                        <div>MAJOR</div>
                        <div  
                           className = "flex items-center justify-between"
                            style={{
                            width: "100%",
                            height: "5vh", 
                            borderRadius: "0.5vh", 
                            padding: "1vh",
                            lineHeight: "3vh",
                            border: "1.5px #c9c9c9 solid",
                            color: "#848484"
                        }}>
                            <div style={{width: "100%"}}> Product Design </div>
                            <button> <DropdownIcon/> </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-end" style={{padding: "2vh"}}>
                        <div 
                            className = "shadow-toolBar" 
                            style = {{ backgroundColor: "#00b4f5", borderRadius: "0.5vh", width: "auto", height: "5vh" }}>
                            <button 
                                onClick={this.applyFilters}
                                style={{
                                    textAlign: "center", 
                                    verticalAlign: "middle", 
                                    lineHeight: "3vh", 
                                    padding: "1vh", 
                                    paddingLeft: "8vw", 
                                    paddingRight: "8vw", 
                                    color: "#ffffff",
                                    fontSize: "8pt"
                                }}>APPLY</button>
                        </div>
                    </div>
                </div>
            </Modal>
        )

        const SearchCard = () => (
            <div 
                className="flex items-center justify-around w-full" 
                style={{
                    height: "7vh", 
                    marginTop: "3vh",
                    paddingTop: "1.5vh", 
                    paddingLeft: "5%", 
                    paddingRight: "5%", 
                    color: "#9b9b9b",
                }}>
                <div className="flex items-center overflow-hidden justify-around" 
                    style={{
                        width: "100%", 
                        height: "100%", 
                        borderRadius: "1vh", 
                        border: "1.5px #c9c9c9 solid"
                    }}>
                    <div style={{width: "85%", height: "100%", backgroundColor: "#ffffff"}}>
                        <input 
                            placeholder={'Search'}
                            style={{ 
                                color: "#575757", 
                                outline: 0, 
                                width: "100%", 
                                height: "100%", 
                                fontSize: "18pt",
                                lineHeight: "100%",
                                paddingLeft: "1vw",
                                paddingRight: "1vw"
                            }}/>
                    </div>
                    <button 
                        className="flex items-center" 
                        style={{
                            outline: "1 #a0a0a0", 
                            width: "15%", 
                            height: "100%", 
                            borderLeft: "1.5px #c9c9c9 solid",
                            backgroundColor: "#ffffff"
                        }}>
                        <SearchIcon style={{width: "75%", height: "75%", marginLeft: "auto", marginRight: "auto" }}/>
                    </button>
                </div>
                {/* dont delete this. changing width of the div above to 85% rather than 100% will make the filter work again! */}
                {/* <button style={{width: "12%", height: "100%"}} onClick={this.openModal}> <FilterIcon className="w-full h-full"/></button> */}
                {/* <div><FilterBox/></div> */}
            </div>
        )

        const PageButton = () => (
            <div 
                className = "shadow-toolBar" 
                style = {{ backgroundColor: "#00b4f5", borderRadius: "0.5vh", width: "auto", height: "5vh" }}>
                <button 
                    style={{
                        textAlign: "center", 
                        verticalAlign: "middle", 
                        lineHeight: "3vh", 
                        padding: "1vh", 
                        paddingLeft: "2vw", 
                        paddingRight: "2vw", 
                        color: "#ffffff",
                        fontSize: "8pt"
                    }}>VISIT PAGE</button>
            </div>
        )
        

        const MobileMatchCard = () => (
                <div 
                    className="flex flex-col items-center" 
                    style={{
                        width: "90%", 
                        height: "16vh", 
                        padding: "1%", 
                        clear: "both", 
                        borderBottom: "1px #a0a0a0 solid"
                    }}>
                    <div 
                        className="w-full flex items-center justify-between" 
                        style={{height: "50%", border: "0px"}}>
                        <div>
                            <b>Alyssa Smith</b>
                        </div>
                        <Photo size={"6vh"}/>
                    </div>
                    <div 
                        className="w-full flex items-center justify-between" 
                        style={{height: "50%",  border: "0px"}}>
                        <div 
                            className="h-full flex flex-col justify-end" 
                            style={{width: "50%"}}>
                            <div>
                                Casa Italiana
                            </div>
                            <div>
                                Product Design
                            </div>
                        </div>
                        <PageButton/>
                    </div>
                </div>
        )

        const DesktopMatchCard = () => (
            <div 
                    className="flex flex-row items-center" 
                    style={{
                        width: "90%", 
                        height: "16vh", 
                        padding: "1%", 
                        clear: "both", 
                        borderBottom: "1px #a0a0a0 solid"
                    }}>
                    <div className = "flex flex-col items-center justify-center" style={{width: "10%", height: "100%"}}>
                        <Photo size={"5vw"}/>
                    </div>
                    <div className = "flex flex-col items-start justify-center" style={{width: "35%", height: "100%", padding: "1%", paddingLeft: "3%"}}>
                        <div style={{color: "#575757", fontSize: "16pt", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical"}}> Alyssa Smith </div>
                    </div>
                    <div className = "flex flex-col items-center justify-around" style={{fontSize: "14pt", width: "35%", height: "100%", padding: "1%"}}>
                        <div className = "flex items-center justify-start" style={{width: "100%"}}>
                            <div><SuiteIcon/></div><div style={{marginLeft: "1vw", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical"}}> Casa Italiana </div>
                        </div>
                        <div className = "flex items-center justify-start" style={{width: "100%"}}>
                            <div><MajorIcon/></div><div style={{marginLeft: "1vw", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical"}}> Product Design</div>
                        </div>
                    </div>
                    <div className = "flex flex-col items-center justify-center" style={{width: "20%", height: "100%", padding: "1%"}}>
                            <PageButton/>
                    </div>
                </div>
        )

        const ResultCard = () => (
            <>
                <div style={{ lineHeight: "6vh", width: "90%", height: "6vh", borderBottom: "1px solid #a0a0a0", marginLeft: "auto", marginRight: "auto", marginTop: "2vh", fontSize: "16pt"}}>
                    <span style={{color: "#c9c9c9"}}>RESULTS </span><span>(42)</span>
                </div>
                {/* <hr style={{ width: "90%", color: "#a0a0a0", backgroundColor: "#a0a0a0", height: "1px"}}/> */}
                <div className="bg-white w-full flex flex-col items-center" styles={{height: "75vh", overflowY: "scroll"}}>   
                    {this.isMobile && <MobileMatchCard/>}
                    {this.isMobile && <MobileMatchCard/>}
                    {this.isMobile && <MobileMatchCard/>}
                    {this.isMobile && <MobileMatchCard/>}
                    {this.isMobile && <MobileMatchCard/>}
                    {this.isMobile && <MobileMatchCard/>}
                    {this.isMobile && <MobileMatchCard/>}
                    {this.isMobile && <MobileMatchCard/>}
                    {this.isMobile && <MobileMatchCard/>}
                    {this.isMobile && <MobileMatchCard/>}
                    {this.isMobile && <MobileMatchCard/>}
                    {this.isMobile && <MobileMatchCard/>}
                    {this.isMobile && <MobileMatchCard/>}

                    {this.isDesktop && <DesktopMatchCard/>}
                    {this.isDesktop && <DesktopMatchCard/>}
                    {this.isDesktop && <DesktopMatchCard/>}
                    {this.isDesktop && <DesktopMatchCard/>}
                    {this.isDesktop && <DesktopMatchCard/>}
                    {this.isDesktop && <DesktopMatchCard/>}
                    {this.isDesktop && <DesktopMatchCard/>}
                    {this.isDesktop && <DesktopMatchCard/>}
                    {this.isDesktop && <DesktopMatchCard/>}
                    {this.isDesktop && <DesktopMatchCard/>}
                    {this.isDesktop && <DesktopMatchCard/>}

                </div>
            </>
        )

        const DesktopDiscover = () => (
            <div className="flex flex-col items-center justify-center" style={{width: "80%", height: "100%", backgroundColor: "#f6f6f6"}}>
                <div style={{width: "100%", height: "15%"}}>
                    <SearchCard/>
                </div>
                <div style={{width: "90%", height: "auto", marginTop: "5vh"}}>
                    <div className="shadow-toolBar" style={{width: "100%", height: "100%", backgroundColor: "#ffffff", borderRadius: "1vw", padding: "2vw", paddingBottom: "10vh"}}>
                        <ResultCard/>
                    </div>
                </div>
                <div style={{width: "100%", height: "10vh"}}>
                    {/* dummy div for this to work */}
                </div>
            </div>
        )

        const MobileDiscover = () => (
            <div className="bg-white w-full h-full flex flex-col items-center">
                <Banner/>
                <SearchCard/>
                <ResultCard/>
            </div>
        )

        return(
            <>
                {this.isMobile && <MobileDiscover/>}
                {this.isDesktop && <DesktopDiscover/>}
            </>
        )
    }

}

export default Discover