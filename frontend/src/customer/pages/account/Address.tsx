import UserAddressCard from './UserAddressCard'
import { useAppSelector } from '../../../state/store'

const Address = () => {
  const { auth } = useAppSelector((store) => store);
  return (
    <div className='space-y-3'>
      {auth.user?.addresses.map((item, index) => (
        <UserAddressCard key={index} address={item} />
      ))}
    </div>
  )
}

export default Address