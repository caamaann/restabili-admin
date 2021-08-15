import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { useHistory } from 'react-router-dom';
import SLUGS from 'resources/slugs';
import {
    IconAgents,
    IconArticles,
    IconContacts,
    IconIdeas,
    IconLogout,
    IconOverview,
    IconSettings,
    IconSubscription,
    IconTickets
} from 'assets/icons';
import { convertSlugToUrl } from 'resources/utilities';
import LogoComponent from './LogoComponent';
import Menu from './MenuComponent';
import MenuItem from './MenuItemComponent';
import iconArticles from 'assets/icons/icon-articles';
import iconAgents from 'assets/icons/icon-agents';
import iconOverview from 'assets/icons/icon-overview';
import iconLogo from 'assets/icons/icon-logo';
import iconBellNew from 'assets/icons/icon-bell-new';
import iconIdeas from 'assets/icons/icon-ideas';
import iconHome from 'assets/icons/icon-home';

const useStyles = createUseStyles({
    separator: {
        borderTop: ({ theme }) => `1px solid ${theme.color.lightGrayishBlue}`,
        marginTop: 16,
        marginBottom: 16,
        opacity: 0.06
    }
});

function SidebarComponent() {
    const { push } = useHistory();
    const theme = useTheme();
    const classes = useStyles({ theme });
    const isMobile = window.innerWidth <= 1080;

    async function logout() {
        push(SLUGS.login);
    }

    function onClick(slug, parameters = {}) {
        push(convertSlugToUrl(slug, parameters));
    }

    return (
        <Menu isMobile={isMobile}>
            <div style={{ paddingTop: 30, paddingBottom: 30 }}>
                <LogoComponent />
            </div>
            <MenuItem
                id={SLUGS.dashboard}
                title='Dashboard'
                icon={iconHome}
                onClick={() => onClick(SLUGS.dashboard)}
            />
            <MenuItem    
                items={[SLUGS.managementArticles, SLUGS.managementUsers, SLUGS.managementChannel]}
                title='Management'
                icon={IconOverview}
            >
                <MenuItem
                    id={SLUGS.managementArticles}
                    title='Articles'
                    level={2}
                    icon={iconArticles}
                    onClick={() => onClick(SLUGS.managementArticles)}
                />
                <MenuItem
                    id={SLUGS.managementUsers}
                    title='Users'
                    level={2}
                    icon={iconAgents}
                    onClick={() => onClick(SLUGS.managementUsers)}
                />
                <MenuItem
                    id={SLUGS.managementChannel}
                    title='Channel'
                    level={2}
                    icon={IconContacts}
                    onClick={() => onClick(SLUGS.managementChannel)}
                />
            </MenuItem>

            <div className={classes.separator}></div>
            <MenuItem
                id={SLUGS.settings}
                title='Settings'
                icon={IconSettings}
                onClick={() => onClick(SLUGS.settings)}
            />

            <MenuItem id='logout' title='Logout' icon={IconLogout} onClick={logout} />
        </Menu>
    );
}

export default SidebarComponent;
