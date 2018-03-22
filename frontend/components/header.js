import React from 'react'
import TabList, { Tab } from '@typeform/kitt/lib/components/tab-list'
import IconV2 from '@typeform/kitt/lib/components/iconv2'
import InlineEditor from '@typeform/kitt/lib/components/inline-editor'
import Logo from '@typeform/kitt/lib/components/logo'
import Split, { SplitItem } from '@typeform/kitt/lib/components/split'
import Container from '@typeform/kitt/lib/components/container'
import Distribute from '@typeform/kitt/lib/components/distribute'
import Button from '@typeform/kitt/lib/components/button'
import Avatar from '@typeform/kitt/lib/components/avatar'
import iconExternalSvg from '@typeform/kitt/lib/iconsv2/external'

const Header = () => (
  <div>
    <Container borderSide='bottom' height='xsm' backgroundColor='white' >
      <Split width='full'>
        <SplitItem width='remaining'>
          <Split align='center' height='full'>
            <SplitItem width='64px'>
              <Distribute position='center'>
                <Logo type='symbol' />
              </Distribute>
            </SplitItem>

            <SplitItem padRight={2}>
              <Container borderSide='left' height='32px' width='1px' />
            </SplitItem>

            <SplitItem>
              <Distribute space={2} align='center'>
                <IconV2 svg={require('@typeform/kitt/lib/iconsv2/workspaces')} boundarySizeY={2.5} position='topCenter' />
                <IconV2 svg={require('@typeform/kitt/lib/iconsv2/caret-right')} />
              </Distribute>
            </SplitItem>

            <SplitItem width='200px'>
              <InlineEditor value='Form' size='large' />
            </SplitItem>
          </Split>
        </SplitItem>

        <SplitItem height='full' padRight={4}>
          <Split height='full' align='center'>
            <SplitItem>
              <Button
                iconSvg={iconExternalSvg}
                iconPosition='left'
              >
                View
              </Button>
            </SplitItem>
            <SplitItem padLeft={2} padRight={2}>
              <Container
                width='1px'
                height='32px'
                borderSide='right'
              />
            </SplitItem>
            <SplitItem>
              <Distribute space={1}>
                <Avatar
                  email='hayk@typeform.com'
                  name='Hayk'
                />
                <IconV2 svg={require('@typeform/kitt/lib/iconsv2/caret-down')} />
              </Distribute>
            </SplitItem>
          </Split>
        </SplitItem>
      </Split>
    </Container>

    <Container borderSide='bottom' height='48px' backgroundColor='white' >
      <Distribute position='center'>
        <Container width='1024px'>
          <TabList size='small' value='insights' type='line'>
            <Tab value='summary' label='Summary' />
            <Tab value='responses' label='Responses' />
            <Tab value='insights' label='Insights' />
          </TabList>
        </Container>
      </Distribute>
    </Container>
  </div>
)

export default Header
