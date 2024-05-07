const { checkLogin, loginUser } = require('../back/User_manage/login.js');
const { signupUser } = require('../back/User_manage/join.js');
const { getSession, logout } = require('./User_manage/session.js');
const { boardInsert } = require('./Clan/boardInsert.js');
const { commentInsert, getComment } = require('./Clan/comment.js');
const { getTeamInfo, getTeams } = require('./Team/team_info.js');
const { addSchedule } = require('./Schedule/addSchedule.js');
const { getSharedSchedules } = require('./Schedule/clanSharedSchedule.js');
const { updateUserInfo } = require('./User_manage/updateUserInfo.js');
const { deleteUser } = require('./User_manage/userInfoDelete.js');
const { getBoard, getBoardList } = require('./Clan/boardList.js');
const { getSubscription, subscribe } = require('./Team/team_subscribe.js');
const { Mypagesubscription } = require('./Team/userTeamInfo.js');
const { createClan } = require('./Clan/clanCreate.js');
const { deleteClan } = require('./Clan/clanDelete.js');
const { deleteClanMember, getClanMembers } = require('./Clan/member.js');
const { getSchedule } = require('./Schedule/getSchedule.js');
const { deleteSchedule } = require('./Schedule/deleteSchedule.js');
const { updateBoard } = require('./Clan/boardUpdate.js');
const { joinClan } = require('./Clan/joinClan.js');
const { getUserInfo } = require('./User_manage/userInfo.js');

const applyRoutes = function (app, upload) {
    app.post('/signup', signupUser);
    app.post('/login', loginUser);
    app.get('/checkLogin', checkLogin);
    app.get('/session', getSession);
    app.post('/logout', logout);
    app.post('/api/boardInsert', upload.single('file'), boardInsert);
    app.post('/api/commentInsert', commentInsert);
    app.get('/api/comment/:idx', getComment);
    app.get('/api/teams', getTeams);
    app.get('/api/teaminfo/:team_idx', getTeamInfo);
    app.post('/api/addSchedule', addSchedule);
    app.get('/api/sharedSchedules/:userId', getSharedSchedules);
    app.post('/api/updateUserInfo', updateUserInfo);
    app.delete('/api/userDelete/:userId', deleteUser);
    app.get('/api/boardList', getBoardList);
    app.get('/api/board/:idx', getBoard);
    app.post('/api/subscribe', subscribe);
    app.post('/api/subscription', getSubscription);
    app.get('/api/Mypagesubscription/:userId', Mypagesubscription);
    app.post('/api/ClanCreate', createClan);
    app.delete('/api/ClanDelete/:userId', deleteClan);
    app.post('/api/ClanMember', getClanMembers);
    app.delete('/api/ClanMemberDelete/:userNick', deleteClanMember);
    app.get('/api/schedule/:userId', getSchedule);
    app.post('/api/deleteSchedule', deleteSchedule);
    app.post('/api/boardUpdate/:b_idx', updateBoard);
    app.delete('/api/boardDelete/:b_idx/:user_id', deleteSchedule);
    app.post('/api/joinClan', joinClan);
    app.post('/UserInfo', getUserInfo)
}

module.exports = { applyRoutes };