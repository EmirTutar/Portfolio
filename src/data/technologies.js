import {
  SiC, SiCplusplus, SiOpenjdk, SiPython, SiDotnet, SiJavascript,
  SiPhp, SiHtml5, SiCss3, SiMysql, SiReact, SiVuedotjs, SiNodedotjs,
  SiRos, SiDocker, SiKubernetes, SiJenkins, SiGithubactions,
  SiGit, SiCmake, SiJira, SiOracle, SiClion, SiIntellijidea,
  SiPycharm, SiAndroidstudio,
} from 'react-icons/si'
import {
  FiCode, FiServer, FiLayers, FiDatabase, FiMonitor, FiTool,
  FiCloud, FiGitPullRequest, FiPackage, FiRadio, FiCpu, FiSettings,
} from 'react-icons/fi'

const GROUPS = [
  {
    key: 'languages',
    labelKey: 'technologies.groups.languages',
    GroupIcon: FiCode,
    skills: [
      { name: 'C++',         Icon: SiCplusplus,     color: '#00599C', level: 4 },
      { name: 'Java',        Icon: SiOpenjdk,        color: '#ED8B00', level: 4 },
      { name: 'Python',      Icon: SiPython,         color: '#3776AB', level: 4 },
      { name: 'C',           Icon: SiC,              color: '#A8B9CC', level: 3 },
      { name: 'C#',          Icon: SiDotnet,         color: '#512BD4', level: 3 },
      { name: 'JavaScript',  Icon: SiJavascript,     color: '#F7DF1E', level: 3 },
      { name: 'SQL',         Icon: SiMysql,          color: '#4479A1', level: 3 },
      { name: 'PHP',         Icon: SiPhp,            color: '#777BB4', level: 2 },
      { name: 'HTML',        Icon: SiHtml5,          color: '#E34F26', level: 2 },
      { name: 'CSS',         Icon: SiCss3,           color: '#1572B6', level: 2 },
      { name: 'Assembler',   Icon: FiCpu,            color: '#6B7280', level: 1 },
    ],
  },
  {
    key: 'frameworks',
    labelKey: 'technologies.groups.frameworks',
    GroupIcon: FiLayers,
    skills: [
      { name: 'React',           Icon: SiReact,        color: '#61DAFB', level: 4 },
      { name: 'Robot Framework', Icon: FiSettings,     color: '#009FDB', level: 4 },
      { name: 'ROS',             Icon: SiRos,          color: '#8FC4E3', level: 3 },
      { name: 'eCAL',            Icon: FiRadio,        color: '#13B276', level: 3 },
      { name: 'Vue.js',          Icon: SiVuedotjs,     color: '#42B883', level: 3 },
      { name: 'Node.js',         Icon: SiNodedotjs,    color: '#339933', level: 2 },
    ],
  },
  {
    key: 'devops',
    labelKey: 'technologies.groups.devops',
    GroupIcon: FiServer,
    skills: [
      { name: 'Docker',         Icon: SiDocker,         color: '#2496ED', level: 4 },
      { name: 'GitHub Actions', Icon: SiGithubactions,  color: '#2088FF', level: 4 },
      { name: 'Jenkins',        Icon: SiJenkins,        color: '#D33833', level: 3 },
      { name: 'Kubernetes',     Icon: SiKubernetes,     color: '#326CE5', level: 2 },
      { name: 'Azure DevOps',   Icon: FiGitPullRequest, color: '#0078D4', level: 2 },
      { name: 'MS Azure',       Icon: FiCloud,          color: '#0078D4', level: 2 },
    ],
  },
  {
    key: 'tools',
    labelKey: 'technologies.groups.tools',
    GroupIcon: FiTool,
    skills: [
      { name: 'Git',   Icon: SiGit,     color: '#F05032', level: 4 },
      { name: 'Jira',  Icon: SiJira,    color: '#0052CC', level: 3 },
      { name: 'CMake', Icon: SiCmake,   color: '#064F8C', level: 3 },
      { name: 'Maven', Icon: FiPackage, color: '#C71A36', level: 2 },
    ],
  },
  {
    key: 'databases',
    labelKey: 'technologies.groups.databases',
    GroupIcon: FiDatabase,
    skills: [
      { name: 'Oracle SQL', Icon: SiOracle, color: '#F80000', level: 2 },
      { name: 'MySQL',      Icon: SiMysql,  color: '#4479A1', level: 2 },
    ],
  },
  {
    key: 'ides',
    labelKey: 'technologies.groups.ides',
    GroupIcon: FiMonitor,
    skills: [
      { name: 'CLion',          Icon: SiClion,         color: '#21D789', level: 4 },
      { name: 'IntelliJ',       Icon: SiIntellijidea,  color: '#FE315D', level: 4 },
      { name: 'PyCharm',        Icon: SiPycharm,       color: '#21D789', level: 4 },
      { name: 'VS Code',        Icon: FiCode,          color: '#007ACC', level: 4 },
      { name: 'Android Studio', Icon: SiAndroidstudio, color: '#3DDC84', level: 3 },
      { name: 'Visual Studio',  Icon: FiCode,          color: '#5C2D91', level: 2 },
    ],
  },
]

export default GROUPS
