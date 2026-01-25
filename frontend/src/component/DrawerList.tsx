import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Divider, ListItemIcon, ListItemText } from '@mui/material';

interface MenuItem {
    name: string;
    path: string;
    icon: any;
    activeIcon: any;
}

interface DrawerListProps {
    menu: MenuItem[];
    menu2: MenuItem[];
    toggleDrawer: (val: boolean) => void;
}

const DrawerList = ({ menu, menu2, toggleDrawer }: DrawerListProps) => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="h-full">
            <div className="flex flex-col justify-between h-full w-[300px] border-r py-5">
                <div className="space-y-2">
                    {menu.map((item, index) => (
                        <div key={index} onClick={() => navigate(item.path)} className="pr-9 cursor-pointer">
                            <p className={`flex items-center px-5 py-3 rounded-r-full ${item.path === location.pathname ? 'bg-primary-color text-white' : 'text-primary-color'}`}>
                                <ListItemIcon>
                                    {item.path === location.pathname ? item.activeIcon : item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </p>
                        </div>
                    ))}
                </div>
                <div>
                    <Divider />
                    <div className="space-y-2 mt-5">
                        {menu2.map((item, index) => (
                            <div key={index} onClick={() => navigate(item.path)} className="pr-9 cursor-pointer">
                                <p className={`flex items-center px-5 py-3 rounded-r-full ${item.path === location.pathname ? 'bg-primary-color text-white' : 'text-primary-color'}`}>
                                    <ListItemIcon>
                                        {item.path === location.pathname ? item.activeIcon : item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} />
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DrawerList;