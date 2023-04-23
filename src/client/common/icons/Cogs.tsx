import type { ReactElement, SVGProps } from 'react'
import { Icon } from './Icon'

export function Cogs(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path d="m11.366 22.564 1.291-1.807-1.414-1.414-1.807 1.291a4.996 4.996 0 0 0-1.071-.444L8 18H6l-.365 2.19a4.946 4.946 0 0 0-1.071.444l-1.807-1.291-1.414 1.414 1.291 1.807a4.943 4.943 0 0 0-.443 1.071L.001 24v2l2.19.365c.107.377.256.736.444 1.071l-1.291 1.807 1.414 1.414 1.807-1.291c.335.187.694.337 1.071.444L6.001 32h2l.365-2.19a4.946 4.946 0 0 0 1.071-.444l1.807 1.291 1.414-1.414-1.291-1.807c.187-.335.337-.694.444-1.071l2.19-.365v-2l-2.19-.365a4.946 4.946 0 0 0-.444-1.071zM7 27a2 2 0 1 1-.001-3.999A2 2 0 0 1 7 27zm25-15v-2l-2.106-.383a8.715 8.715 0 0 0-.148-.743l1.799-1.159-.765-1.848-2.092.452a8.957 8.957 0 0 0-.422-.629l1.219-1.761-1.414-1.414-1.761 1.219a8.957 8.957 0 0 0-.629-.422l.452-2.092-1.848-.765-1.159 1.799a9.122 9.122 0 0 0-.743-.148L22 0h-2l-.383 2.106a8.715 8.715 0 0 0-.743.148L17.715.455l-1.848.765.452 2.092a8.957 8.957 0 0 0-.629.422l-1.761-1.219-1.414 1.414 1.219 1.761c-.149.203-.29.413-.422.629l-2.092-.452-.765 1.848 1.799 1.159a9.122 9.122 0 0 0-.148.743L10 10v2l2.106.383c.039.251.088.499.148.743l-1.799 1.159.765 1.848 2.092-.452c.132.216.273.426.422.629l-1.219 1.761 1.414 1.414 1.761-1.219c.203.149.413.29.629.422l-.452 2.092 1.848.765 1.159-1.799c.244.059.492.109.743.148L20 22h2l.383-2.106c.251-.039.499-.088.743-.148l1.159 1.799 1.848-.765-.452-2.092c.216-.132.426-.273.629-.422l1.761 1.219 1.414-1.414-1.219-1.761c.149-.203.29-.413.422-.629l2.092.452.765-1.848-1.799-1.159c.059-.244.109-.492.148-.743L32 12zm-11 3.35a4.35 4.35 0 1 1 .001-8.701A4.35 4.35 0 0 1 21 15.35z" />
    </Icon>
  )
}