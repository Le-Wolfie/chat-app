import Image from "next/image";

type Props = {
  size?: number;
};

export const LoadingLogo = ({ size = 100 }: Props) => {
  return (
    <div className='flex justify-center items-center h-full w-full'>
      <Image
        src='/logo.svg'
        alt='LOADING...'
        width={size}
        height={size}
        className='animate-pulse duration-800'
      />
    </div>
  );
};
