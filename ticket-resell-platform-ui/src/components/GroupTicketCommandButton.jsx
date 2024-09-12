import { useState } from "react";
import '../assets/css/GroupTicketCommandutton.css'


export default function GroupTicketCommandButton() {

    const [activeTab, setActiveTab] = useState('Đang xử lý');

    const tabs = [
        { label: 'Đang xử lý' },
        { label: 'Đang giao'},
        { label: 'Chờ giao hàng' },
        { label: 'Hoàn thành' },
        { label: 'Đã hủy' },
        { label: 'Đánh giá' }
    ];

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="tab-menu" style={{width: '98%'}}>
            {tabs.map((tab) => (
                <a
                    key={tab.label}
                    href="#"
                    className={activeTab === tab.label ? 'active' : ''}
                    onClick={() => handleTabClick(tab.label)}
                >
                    {tab.label} {tab.count && <span>({tab.count})</span>}
                </a>
            ))}
        </div>
    );
}
