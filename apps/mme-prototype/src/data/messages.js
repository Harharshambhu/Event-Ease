// Messages domain — per-channel message threads with lorem ipsum text (varying lengths for bubble variety)
// isCurrentUser: true = Jane Doe — drives blue bubble styling

// Lorem ipsum variants by length
const xs  = 'Lorem ipsum dolor sit amet.';
const s   = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
const m   = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget nulla et eros porttitor feugiat non eu ipsum.';
const l   = 'Donec sit amet odio eros. Sed efficitur elementum orci nec accumsan. Nulla ut pulvinar lacus. Etiam sit amet blandit augue. Morbi vitae dolor ac enim rutrum dapibus.';
const xl  = 'Maecenas quis nisi in est pretium blandit id vel felis. Duis ornare ullamcorper lobortis. Duis hendrerit mi ut convallis venenatis. Vestibulum imperdiet mi magna, quis dapibus elit gravida at. Cras vel porttitor arcu, non dignissim dui. Quisque pretium ante id vehicula sagittis.';
const xxl = 'Quisque velit nunc, varius id ultrices ac, interdum ut erat. Proin eget massa tellus. Mauris augue arcu, vehicula sit amet vestibulum nec, porta quis magna. Pellentesque luctus pulvinar urna eget facilisis. Aliquam sed tempus mi, id pulvinar nisi. Sed rhoncus sit amet nunc vitae pretium. Phasellus porttitor, enim sit amet sollicitudin mollis, nisl felis cursus massa.';

export const channelMessages = {
    'inf25-general': [
        { id: 'ig-d1', type: 'date-separator', text: '2 days ago' },
        { id: 'ig-1', initials: 'SD', name: 'Sofia Davis',  isCurrentUser: false, time: '9:00 AM',  text: s,   replies: 0 },
        { id: 'ig-2', initials: 'JD', name: 'Jane Doe',     isCurrentUser: true,  time: '9:05 AM',  text: xs,  replies: 0 },
        { id: 'ig-3', initials: 'SD', name: 'Sofia Davis',  isCurrentUser: false, time: '9:10 AM',  text: m,   replies: 0 },
        { id: 'ig-4', initials: 'JL', name: 'Jackson Lee',  isCurrentUser: false, time: '9:15 AM',  text: xl,  replies: 3 },
        { id: 'ig-5', initials: 'JD', name: 'Jane Doe',     isCurrentUser: true,  time: '9:22 AM',  text: s,   replies: 0 },
        { id: 'ig-6', initials: 'PS', name: 'Priya Sharma', isCurrentUser: false, time: '9:32 AM',  text: m,   replies: 0 },
        { id: 'ig-7', initials: 'JD', name: 'Jane Doe',     isCurrentUser: true,  time: '9:40 AM',  text: l,   replies: 0 },
        { id: 'ig-8', initials: 'PS', name: 'Priya Sharma', isCurrentUser: false, time: '9:48 AM',  text: l,   replies: 1 },
        { id: 'ig-d2', type: 'date-separator', text: 'Yesterday' },
        { id: 'ig-s1', type: 'system', text: 'Jane Doe joined the channel' },
        { id: 'ig-9',  initials: 'JD', name: 'Jane Doe',    isCurrentUser: true,  time: '10:45 AM', text: xxl, replies: 0 },
        { id: 'ig-10', initials: 'RM', name: 'Rahul Menon', isCurrentUser: false, time: '10:55 AM', text: xs,  replies: 0 },
        /* file attachment */
        { id: 'ig-f1', initials: 'SD', name: 'Sofia Davis', isCurrentUser: false, time: '11:00 AM',
          type: 'file', file: { name: 'Infosys_Summit_Runsheet_v3.xlsx', size: '148 KB', ext: 'xlsx' }, replies: 0 },
        { id: 'ig-11', initials: 'SD', name: 'Sofia Davis', isCurrentUser: false, time: '11:02 AM', text: l,   replies: 2 },
        { id: 'ig-12', initials: 'JD', name: 'Jane Doe',    isCurrentUser: true,  time: '11:20 AM', text: m,   replies: 0 },
        { id: 'ig-13', initials: 'RM', name: 'Rahul Menon', isCurrentUser: false, time: '11:30 AM', text: xl,  replies: 0 },
        { id: 'ig-14', initials: 'JD', name: 'Jane Doe',    isCurrentUser: true,  time: '11:45 AM', text: s,   replies: 0 },
        /* poll message */
        { id: 'ig-p1', initials: 'JL', name: 'Jackson Lee', isCurrentUser: false, time: '11:55 AM',
          type: 'poll',
          poll: {
              question: 'Which day works for the site visit?',
              multiSelect: true,
              options: [
                  { label: 'Monday Apr 7',  votes: 4, voted: true },
                  { label: 'Tuesday Apr 8', votes: 6, voted: true },
                  { label: 'Thursday Apr 10', votes: 2, voted: false },
                  { label: 'Friday Apr 11', votes: 1, voted: false },
              ],
              totalVotes: 13,
          },
          replies: 0,
        },
        { id: 'ig-d3', type: 'date-separator', text: 'Today' },
        { id: 'ig-15', initials: 'SD', name: 'Sofia Davis',  isCurrentUser: false, time: '12:02 PM', text: m,   replies: 0 },
        { id: 'ig-16', initials: 'JL', name: 'Jackson Lee',  isCurrentUser: false, time: '12:10 PM', text: xs,  replies: 0 },
        { id: 'ig-17', initials: 'JD', name: 'Jane Doe',     isCurrentUser: true,  time: '12:15 PM', text: l,   replies: 0 },
        { id: 'ig-18', initials: 'PS', name: 'Priya Sharma', isCurrentUser: false, time: '12:22 PM', text: xxl, replies: 2 },
        { id: 'ig-19', initials: 'JD', name: 'Jane Doe',     isCurrentUser: true,  time: '12:35 PM', text: xs,  replies: 0 },
        { id: 'ig-20', initials: 'RM', name: 'Rahul Menon',  isCurrentUser: false, time: '12:40 PM', text: s,   replies: 0 },
        { id: 'ig-s2', type: 'system', text: 'Jackson Lee pinned a message' },
        { id: 'ig-21', initials: 'JD', name: 'Jane Doe',     isCurrentUser: true,  time: '1:05 PM',  text: m,   replies: 0 },
        { id: 'ig-22', initials: 'SD', name: 'Sofia Davis',  isCurrentUser: false, time: '1:15 PM',  text: xl,  replies: 1 },
        { id: 'ig-23', initials: 'JL', name: 'Jackson Lee',  isCurrentUser: false, time: '1:28 PM',  text: l,   replies: 0 },
        { id: 'ig-24', initials: 'JD', name: 'Jane Doe',     isCurrentUser: true,  time: '1:45 PM',  text: xs,  replies: 0 },
    ],
    'inf25-ops': [
        { id: 'io-d1', type: 'date-separator', text: 'Yesterday' },
        { id: 'io-1',  initials: 'SD', name: 'Sofia Davis',   isCurrentUser: false, time: '8:50 AM',  text: m,   replies: 0 },
        { id: 'io-2',  initials: 'RM', name: 'Rahul Menon',   isCurrentUser: false, time: '9:10 AM',  text: xl,  replies: 1 },
        { id: 'io-3',  initials: 'JD', name: 'Jane Doe',      isCurrentUser: true,  time: '9:25 AM',  text: s,   replies: 0 },
        /* poll — vendor selection */
        { id: 'io-p1', initials: 'RM', name: 'Rahul Menon', isCurrentUser: false, time: '9:35 AM',
          type: 'poll',
          poll: {
              question: 'Preferred AV setup for main stage?',
              multiSelect: false,
              options: [
                  { label: 'Option A — LED wall + 2 screens', votes: 7, voted: true  },
                  { label: 'Option B — Projector + screen',    votes: 3, voted: false },
                  { label: 'Option C — LED wall only',         votes: 2, voted: false },
              ],
              totalVotes: 12,
          },
          replies: 0,
        },
        { id: 'io-d2', type: 'date-separator', text: 'Today' },
        { id: 'io-s1', type: 'system', text: 'Rahul Sharma (AV Solutions) was added to this channel' },
        { id: 'io-4',  initials: 'RS', name: 'Rahul Sharma',  isCurrentUser: false, time: '10:05 AM', text: l,   replies: 0 },
        /* file — AV contract */
        { id: 'io-f1', initials: 'RS', name: 'Rahul Sharma', isCurrentUser: false, time: '10:10 AM',
          type: 'file', file: { name: 'AV_Solutions_Contract_INF25.docx', size: '340 KB', ext: 'docx' }, replies: 1 },
        { id: 'io-5',  initials: 'RM', name: 'Rahul Menon',   isCurrentUser: false, time: '10:20 AM', text: m,   replies: 0 },
        { id: 'io-6',  initials: 'JD', name: 'Jane Doe',      isCurrentUser: true,  time: '10:55 AM', text: xs,  replies: 0 },
    ],
    'inf25-production': [
        { id: 'ip-1', initials: 'JL', name: 'Jackson Lee',  isCurrentUser: false, time: '8:30 AM',  text: l,   replies: 0 },
        { id: 'ip-2', initials: 'RS', name: 'Rahul Sharma', isCurrentUser: false, time: '9:00 AM',  text: m,   replies: 0 },
        { id: 'ip-3', initials: 'JL', name: 'Jackson Lee',  isCurrentUser: false, time: '9:15 AM',  text: xl,  replies: 2 },
        { id: 'ip-4', initials: 'JD', name: 'Jane Doe',     isCurrentUser: true,  time: '10:30 AM', text: s,   replies: 0 },
    ],
    'inf25-registration': [
        { id: 'ir-d1', type: 'date-separator', text: '3 days ago' },
        { id: 'ir-1',  initials: 'PS', name: 'Priya Sharma', isCurrentUser: false, time: '9:00 AM',  text: xxl, replies: 1 },
        { id: 'ir-2',  initials: 'AV', name: 'Anita Verma',  isCurrentUser: false, time: '9:40 AM',  text: l,   replies: 0 },
        /* file — guest list */
        { id: 'ir-f1', initials: 'AV', name: 'Anita Verma', isCurrentUser: false, time: '9:45 AM',
          type: 'file', file: { name: 'Infosys_GuestList_Draft_v2.xlsx', size: '92 KB', ext: 'xlsx' }, replies: 0 },
        { id: 'ir-d2', type: 'date-separator', text: 'Today' },
        { id: 'ir-3',  initials: 'JD', name: 'Jane Doe',     isCurrentUser: true,  time: '10:00 AM', text: m,   replies: 0 },
        /* poll — badge colour */
        { id: 'ir-p1', initials: 'JD', name: 'Jane Doe', isCurrentUser: true, time: '10:05 AM',
          type: 'poll',
          poll: {
              question: 'Badge colour scheme for delegates?',
              multiSelect: false,
              options: [
                  { label: 'Navy + Gold',  votes: 9,  voted: true  },
                  { label: 'White + Blue', votes: 4,  voted: false },
                  { label: 'Black + Silver', votes: 2, voted: false },
              ],
              totalVotes: 15,
          },
          replies: 0,
        },
        { id: 'ir-4',  initials: 'PS', name: 'Priya Sharma', isCurrentUser: false, time: '10:45 AM', text: s,   replies: 0 },
    ],
    'inf25-marketing': [
        { id: 'im-1', initials: 'SD', name: 'Sofia Davis', isCurrentUser: false, time: '10:00 AM', text: xl,  replies: 0 },
        { id: 'im-2', initials: 'JD', name: 'Jane Doe',    isCurrentUser: true,  time: '10:30 AM', text: l,   replies: 0 },
        { id: 'im-3', initials: 'SD', name: 'Sofia Davis', isCurrentUser: false, time: '11:00 AM', text: s,   replies: 1 },
        { id: 'im-4', initials: 'JD', name: 'Jane Doe',    isCurrentUser: true,  time: '11:20 AM', text: m,   replies: 0 },
    ],
    'inf25-finance': [
        { id: 'if-1', initials: 'SD', name: 'Sofia Davis', isCurrentUser: false, time: '9:00 AM',  text: l,   replies: 0 },
        { id: 'if-2', initials: 'JD', name: 'Jane Doe',    isCurrentUser: true,  time: '9:20 AM',  text: xl,  replies: 1 },
        { id: 'if-3', initials: 'RM', name: 'Rahul Menon', isCurrentUser: false, time: '9:45 AM',  text: m,   replies: 0 },
    ],
    'inf25-logistics': [
        { id: 'il-1', initials: 'RM', name: 'Rahul Menon', isCurrentUser: false, time: '9:30 AM',  text: l,   replies: 0 },
        { id: 'il-2', initials: 'JD', name: 'Jane Doe',    isCurrentUser: true,  time: '10:15 AM', text: xl,  replies: 1 },
        { id: 'il-3', initials: 'RM', name: 'Rahul Menon', isCurrentUser: false, time: '10:40 AM', text: m,   replies: 0 },
        { id: 'il-4', initials: 'JD', name: 'Jane Doe',    isCurrentUser: true,  time: '11:05 AM', text: s,   replies: 0 },
    ],
    'inf25-alerts': [
        { id: 'ia-s1', type: 'system', text: 'Broadcast sent by Sofia Davis — Apr 3, 9:00 AM' },
        { id: 'ia-1', initials: 'SD', name: 'Sofia Davis', isCurrentUser: false, time: '9:00 AM', text: l, replies: 0 },
        { id: 'ia-s2', type: 'system', text: '2 of 4 vendors acknowledged' },
    ],
    'wip24-general': [
        { id: 'wg-1', initials: 'SD', name: 'Sofia Davis', isCurrentUser: false, time: '2:00 PM', text: m,   replies: 0 },
        { id: 'wg-2', initials: 'RM', name: 'Rahul Menon', isCurrentUser: false, time: '2:30 PM', text: xl,  replies: 1 },
        { id: 'wg-3', initials: 'JD', name: 'Jane Doe',    isCurrentUser: true,  time: '3:00 PM', text: l,   replies: 0 },
        { id: 'wg-4', initials: 'RM', name: 'Rahul Menon', isCurrentUser: false, time: '3:30 PM', text: s,   replies: 0 },
        { id: 'wg-5', initials: 'JD', name: 'Jane Doe',    isCurrentUser: true,  time: '4:00 PM', text: m,   replies: 0 },
    ],
    'wip24-ops': [
        { id: 'wo-1', initials: 'RM', name: 'Rahul Menon', isCurrentUser: false, time: '10:00 AM', text: l,  replies: 0 },
        { id: 'wo-2', initials: 'JD', name: 'Jane Doe',    isCurrentUser: true,  time: '10:30 AM', text: xl, replies: 1 },
        { id: 'wo-3', initials: 'RM', name: 'Rahul Menon', isCurrentUser: false, time: '11:00 AM', text: m,  replies: 0 },
    ],
    'wip24-catering': [
        { id: 'wc-1', initials: 'VP', name: 'Vikram Patel', isCurrentUser: false, time: '11:00 AM', text: xxl, replies: 0 },
        { id: 'wc-2', initials: 'JD', name: 'Jane Doe',     isCurrentUser: true,  time: '11:20 AM', text: m,   replies: 0 },
        { id: 'wc-3', initials: 'VP', name: 'Vikram Patel', isCurrentUser: false, time: '11:35 AM', text: s,   replies: 0 },
    ],
    'wip24-logistics': [
        { id: 'wl-1', initials: 'RM', name: 'Rahul Menon', isCurrentUser: false, time: '2:00 PM', text: xl, replies: 2 },
        { id: 'wl-2', initials: 'JD', name: 'Jane Doe',    isCurrentUser: true,  time: '2:30 PM', text: l,  replies: 0 },
    ],
    'company-general': [
        { id: 'cg-1', initials: 'SD', name: 'Sofia Davis',  isCurrentUser: false, time: 'Yesterday 5:00 PM', text: xl,  replies: 4 },
        { id: 'cg-s1', type: 'system', text: 'Priya Sharma joined the workspace' },
        { id: 'cg-2', initials: 'RM', name: 'Rahul Menon',  isCurrentUser: false, time: 'Today 9:00 AM',     text: l,   replies: 0 },
        { id: 'cg-3', initials: 'JD', name: 'Jane Doe',     isCurrentUser: true,  time: 'Today 9:15 AM',     text: xs,  replies: 0 },
        { id: 'cg-4', initials: 'PS', name: 'Priya Sharma', isCurrentUser: false, time: 'Today 9:40 AM',     text: m,   replies: 0 },
    ],
    'company-wins': [
        { id: 'cw-d1', type: 'date-separator', text: '2 days ago' },
        { id: 'cw-1',  initials: 'SD', name: 'Sofia Davis',  isCurrentUser: false, time: '2 days ago', text: xxl, replies: 5 },
        { id: 'cw-2',  initials: 'JL', name: 'Jackson Lee',  isCurrentUser: false, time: '2 days ago', text: m,   replies: 0 },
        { id: 'cw-d2', type: 'date-separator', text: '1 day ago' },
        { id: 'cw-3',  initials: 'JD', name: 'Jane Doe',     isCurrentUser: true,  time: '1 day ago',  text: l,   replies: 1 },
        /* poll — team recognition vote */
        { id: 'cw-p1', initials: 'SD', name: 'Sofia Davis', isCurrentUser: false, time: '1 day ago',
          type: 'poll',
          poll: {
              question: '🏆 Who deserves the Star of the Month?',
              multiSelect: false,
              options: [
                  { label: 'Rahul Menon',   votes: 8, voted: false },
                  { label: 'Priya Sharma',  votes: 12, voted: true  },
                  { label: 'Jackson Lee',   votes: 5, voted: false },
                  { label: 'Anita Verma',   votes: 3, voted: false },
              ],
              totalVotes: 28,
          },
          replies: 2,
        },
        { id: 'cw-d3', type: 'date-separator', text: 'Today' },
        { id: 'cw-4',  initials: 'PS', name: 'Priya Sharma', isCurrentUser: false, time: 'Today',      text: s,   replies: 0 },
    ],
    'company-random': [
        { id: 'cr-1', initials: 'JL', name: 'Jackson Lee',  isCurrentUser: false, time: 'Yesterday',     text: s,  replies: 3 },
        { id: 'cr-2', initials: 'PS', name: 'Priya Sharma', isCurrentUser: false, time: 'Yesterday',     text: xs, replies: 0 },
        { id: 'cr-3', initials: 'JD', name: 'Jane Doe',     isCurrentUser: true,  time: 'Today 9:05 AM', text: s,  replies: 0 },
        { id: 'cr-4', initials: 'RM', name: 'Rahul Menon',  isCurrentUser: false, time: 'Today 9:10 AM', text: xs, replies: 0 },
    ],
    'dept-operations': [
        { id: 'do-d1', type: 'date-separator', text: 'Yesterday' },
        { id: 'do-1',  initials: 'SD', name: 'Sofia Davis',  isCurrentUser: false, time: 'Yesterday 5:00 PM', text: xxl, replies: 4 },
        { id: 'do-s1', type: 'system', text: 'Priya Sharma joined the workspace' },
        { id: 'do-d2', type: 'date-separator', text: 'Today' },
        { id: 'do-2',  initials: 'RM', name: 'Rahul Menon',  isCurrentUser: false, time: 'Today 9:00 AM',  text: l,  replies: 0 },
        /* file — ops runsheet */
        { id: 'do-f1', initials: 'RM', name: 'Rahul Menon', isCurrentUser: false, time: 'Today 9:02 AM',
          type: 'file', file: { name: 'Dept_Ops_Schedule_Q2.pdf', size: '2.1 MB', ext: 'pdf' }, replies: 0 },
        { id: 'do-3',  initials: 'JD', name: 'Jane Doe',    isCurrentUser: true,  time: 'Today 9:15 AM',  text: xs, replies: 0 },
        { id: 'do-4',  initials: 'PS', name: 'Priya Sharma',isCurrentUser: false, time: 'Today 9:40 AM',  text: m,  replies: 0 },
    ],
    'dept-production': [
        { id: 'dprod-1', initials: 'JL', name: 'Jackson Lee',  isCurrentUser: false, time: 'Mar 25', text: m,   replies: 0 },
        { id: 'dprod-2', initials: 'JD', name: 'Jane Doe',     isCurrentUser: true,  time: 'Mar 26', text: s,   replies: 0 },
        { id: 'dprod-3', initials: 'JL', name: 'Jackson Lee',  isCurrentUser: false, time: 'Mar 27', text: xxl, replies: 3 },
        { id: 'dprod-4', initials: 'SD', name: 'Sofia Davis',  isCurrentUser: false, time: 'Mar 28', text: l,   replies: 0 },
    ],
    'dept-marketing': [
        { id: 'dmkt-1', initials: 'SD', name: 'Sofia Davis',  isCurrentUser: false, time: 'Mar 20', text: xl,  replies: 1 },
        { id: 'dmkt-2', initials: 'PS', name: 'Priya Sharma', isCurrentUser: false, time: 'Mar 22', text: m,   replies: 0 },
        { id: 'dmkt-3', initials: 'JD', name: 'Jane Doe',     isCurrentUser: true,  time: 'Mar 24', text: l,   replies: 0 },
        { id: 'dmkt-4', initials: 'SD', name: 'Sofia Davis',  isCurrentUser: false, time: 'Apr 1',  text: s,   replies: 0 },
        { id: 'dmkt-5', initials: 'JD', name: 'Jane Doe',     isCurrentUser: true,  time: 'Apr 2',  text: m,   replies: 0 },
    ],
    'dept-finance': [
        { id: 'dfin-1', initials: 'RM', name: 'Rahul Menon', isCurrentUser: false, time: 'Mar 28', text: xl,  replies: 2 },
        { id: 'dfin-2', initials: 'SD', name: 'Sofia Davis', isCurrentUser: false, time: 'Mar 29', text: l,   replies: 0 },
        { id: 'dfin-3', initials: 'JD', name: 'Jane Doe',    isCurrentUser: true,  time: 'Apr 1',  text: m,   replies: 1 },
        { id: 'dfin-4', initials: 'RM', name: 'Rahul Menon', isCurrentUser: false, time: 'Apr 1',  text: s,   replies: 0 },
    ],
    'dept-logistics': [
        { id: 'dlog-1', initials: 'RM', name: 'Rahul Menon', isCurrentUser: false, time: 'Mar 30', text: l,   replies: 0 },
        { id: 'dlog-2', initials: 'JD', name: 'Jane Doe',    isCurrentUser: true,  time: 'Mar 31', text: xl,  replies: 1 },
        { id: 'dlog-3', initials: 'RM', name: 'Rahul Menon', isCurrentUser: false, time: 'Apr 1',  text: m,   replies: 0 },
        { id: 'dlog-4', initials: 'JD', name: 'Jane Doe',    isCurrentUser: true,  time: 'Apr 2',  text: s,   replies: 0 },
    ],
    'dept-registration': [
        { id: 'dreg-1', initials: 'PS', name: 'Priya Sharma', isCurrentUser: false, time: 'Mar 18', text: xxl, replies: 2 },
        { id: 'dreg-2', initials: 'JD', name: 'Jane Doe',     isCurrentUser: true,  time: 'Mar 20', text: l,   replies: 0 },
        { id: 'dreg-3', initials: 'PS', name: 'Priya Sharma', isCurrentUser: false, time: 'Apr 1',  text: m,   replies: 0 },
    ],
    'tech26-general': [
        { id: 'tg-1', initials: 'SD', name: 'Sofia Davis', isCurrentUser: false, time: 'Mar 15', text: l,  replies: 0 },
        { id: 'tg-2', initials: 'JD', name: 'Jane Doe',    isCurrentUser: true,  time: 'Mar 16', text: s,  replies: 0 },
    ],
};

// Backward-compat shim
export const chatMessages = channelMessages['inf25-general'];

// Fallback for channels with no specific thread
export const defaultChannelMessages = [
    { id: 'def-1', initials: 'SD', name: 'Sofia Davis', isCurrentUser: false, time: '10:00 AM', text: m,  replies: 0 },
    { id: 'def-2', initials: 'JD', name: 'Jane Doe',    isCurrentUser: true,  time: '10:05 AM', text: xs, replies: 0 },
];
