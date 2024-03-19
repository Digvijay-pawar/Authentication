// Import the necessary icon
import { FiHome } from 'react-icons/fi';
import { MdGroupAdd, MdAccountCircle, MdAccountBalanceWallet, MdHomeFilled } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
const NavbarTab = (props) => {
    const navigate = useNavigate();

    let resultTab = "";
    if (props.tabName === "Home") {
        resultTab = <MdHomeFilled size={30} className="mr-3tab-icon align-self-center" />
    } else if (props.tabName === "Invite") {
        resultTab = <MdGroupAdd size={30} className="mr-3tab-icon align-self-center" />
    } else if (props.tabName === "Recharge") {
        resultTab = <MdAccountBalanceWallet size={30} className="mr-3tab-icon align-self-center" />
    } else if (props.tabName === "My") {
        resultTab = <MdAccountCircle size={30} className="mr-3tab-icon align-self-center" />
    }
    return (
        <div className=' d-flex flex-column align-items-center text-center' onClick={() => navigate(`/${props.tabName}`)}>
            {resultTab}
            <span className=''>{props.tabName}</span>
        </div>
    );
};

export default NavbarTab;
