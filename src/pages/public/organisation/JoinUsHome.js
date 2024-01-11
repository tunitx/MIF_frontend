import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const MembershipType = () => {
    const navigate = useNavigate();
    useEffect(() => {
        Swal.fire({
            title: 'Choose your Membership Type',
            text: 'Do you want to be a Corporate Member or an Individual Member of MIF?',
            showDenyButton: true,
            confirmButtonText: `Corporate Member`,
            denyButtonText: `Individual Member`,
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/join-us')
            } else if (result.isDenied) {
                navigate('/join-us-member')
            }
        });
    }, []);

    return <div>

        
    </div>;
};

export default MembershipType;