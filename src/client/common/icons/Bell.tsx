import type { ReactElement, SVGProps } from 'react'
import { Icon } from './Icon'

export function Bell(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path
        fill="#444"
        d="M32.047 25c0-9-8-7-8-14 0-.58-.056-1.076-.158-1.498-.526-3.532-2.88-6.366-5.93-7.23.027-.123.041-.251.041-.382 0-1.04-.9-1.891-2-1.891S14 .85 14 1.89c0 .131.014.258.041.382-3.421.969-5.966 4.416-6.039 8.545L8 11c0 7-8 5-8 14 0 2.382 5.331 4.375 12.468 4.878a3.998 3.998 0 007.064 0C26.669 29.375 32 27.383 32 25l-.001-.021.048.021zm-6.227 1.691c-1.695.452-3.692.777-5.837.958a4 4 0 00-7.968 0c-2.144-.18-4.142-.506-5.837-.958-2.332-.622-3.447-1.318-3.855-1.691.408-.372 1.523-1.068 3.855-1.691 2.712-.724 6.199-1.122 9.82-1.122s7.109.398 9.82 1.122c2.332.622 3.447 1.318 3.855 1.691-.408.372-1.523 1.068-3.855 1.691z"
      />
    </Icon>
  )
}
