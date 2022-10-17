import styled from "styled-components";
import { Table, Button, List ,Space} from "antd";

export const Title = styled.h3`
  font-size: 20px;
  text-transform: uppercase;
  color:#1d3a98;
  font-weight: 900;
`
export const CustomButton = styled(Button)`
  height: auto;
  font-size: 16px;
`
export const Search = styled.div`
  display: flex;
  width: 500px;
  justify-content: flex-end;
  font-weight: 900;
`
export const CustomTable = styled(Table)`
  & th{
    text-transform: uppercase;
    background-color: #096dd9!important ;
    color: white !important;
    white-space: nowrap;
  }
`
export const CustomTableChild = styled(Table)`
  & th{
    padding: 5px !important;
    text-transform: uppercase;
    background-color: #535050d5 !important ;
    color: white !important;
  }
`
export const ImageItem = styled.div`
  width: 80px;
  padding-top: 50%;
  background-image: url(${(props)=>props.image ? props.image :null});
  background-size: contain;
`
export const ListItem = styled(List.Item)`
  background-color: #feffe6;
`
export const ShowImage = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
`
export const CustomSpaceBox = styled(Space)`
  display: flex;
  justify-content: space-between;
`