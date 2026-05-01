export const SIMULATION_STEPS = [
  {
    id: 'registration',
    title: 'Registration & Verification',
    description: 'Verify your name in the electoral roll and provide identity proof.',
    icon: 'IdentificationIcon'
  },
  {
    id: 'ink',
    title: 'Marking with Indelible Ink',
    description: 'The polling officer will mark your finger with ink and take your signature.',
    icon: 'PencilSquareIcon'
  },
  {
    id: 'polling-booth',
    title: 'The Polling Booth',
    description: 'Enter the secret voting compartment to cast your vote.',
    icon: 'HandRaisedIcon'
  },
  {
    id: 'evm',
    title: 'Voting & Verification',
    description: 'Cast your vote on the EVM and verify the VVPAT slip.',
    icon: 'CpuChipIcon'
  }
];

export const CANDIDATES = [
  { id: 1, name: 'Aarav Sharma', party: 'Progressive India Party', symbol: '☀️' },
  { id: 2, name: 'Ishani Gupta', party: 'United People Front', symbol: '🌊' },
  { id: 3, name: 'Vikram Singh', party: 'National Heritage Party', symbol: '🏔️' },
  { id: 4, name: 'Ananya Reddy', party: 'Digital Bharat Forum', symbol: '💻' },
  { id: 5, name: 'NOTA', party: 'None of the Above', symbol: '🚫' }
];

export const POLLING_BOOTHS = [
  { 
    id: 'PB-001', 
    name: 'Govt. Primary School, Ward 12', 
    location: 'Delhi',
    address: '12-B, Rajouri Garden, New Delhi - 110027',
    lat: 28.6415, 
    lng: 77.1209,
    timing: '7:00 AM - 6:00 PM',
    pincodes: ['110027', '110028']
  },
  { 
    id: 'PB-002', 
    name: 'Community Center, Sector 45', 
    location: 'Mumbai',
    address: 'Plot 4, Seawoods, Sector 45, Navi Mumbai - 400706',
    lat: 19.0176, 
    lng: 73.0188,
    timing: '7:00 AM - 6:00 PM',
    pincodes: ['400706', '400705']
  },
  { 
    id: 'PB-003', 
    name: 'Zilla Parishad Hall', 
    location: 'Bangalore',
    address: 'Near Town Hall, JC Road, Bangalore - 560002',
    lat: 12.9647, 
    lng: 77.5851,
    timing: '7:00 AM - 6:00 PM',
    pincodes: ['560002', '560001']
  }
];
