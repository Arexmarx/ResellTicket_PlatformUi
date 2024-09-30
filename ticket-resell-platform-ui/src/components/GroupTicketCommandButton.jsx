import { useState } from "react";
import '../assets/css/GroupTicketCommandutton.css'

/*
    Author: Nguyen Tien Thuan
*/
export default function GroupTicketCommandButton() {

    const tabs = [
        { id: '1', label: 'Đang xử lý' },
        { id: '2', label: 'Đang giao' },
        { id: '3', label: 'Chờ giao hàng' },
        { id: '4', label: 'Hoàn thành' },
        { id: '5', label: 'Đã hủy' },
        { id: '6', label: 'Đánh giá' }
    ];

    const [activeTab, setActiveTab] = useState(tabs[0]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="tab-menu" style={{ width: '98%' }}>
            {tabs.map((tab) => (
                <a
                    key={tab.id}
                    href="#"
                    className={activeTab.id === tab.id ? 'active' : ''}
                    onClick={() => handleTabClick(tab)}
                >
                    {tab.label} {tab.count && <span>({tab.count})</span>}
                </a>
            ))}
        </div>
    );
}
