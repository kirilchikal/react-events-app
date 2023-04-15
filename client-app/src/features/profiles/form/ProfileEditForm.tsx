import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { Button } from "semantic-ui-react";
import { Profile } from "../../../app/models/profile";

interface Props{
    setEditMode: (mode: boolean) => void;
}

export default function ProfileEditForm({setEditMode}: Props) {
    const {profileStore: {profile, editProfile}} = useStore();

    const initialValues = {
        displayName: profile?.displayName, 
        bio: !profile?.bio ? "" : profile.bio
    };

    const validationSchema = Yup.object({
        displayName: Yup.string().required('Display name cannot be empty')
    });

    function handleFormSubmit(values: Partial<Profile>) {
        editProfile(values).then(() => setEditMode(false));
    }

    return (
        <Formik 
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => handleFormSubmit(values)}
        >
            {({dirty, isValid, isSubmitting}) => (
                <Form className="ui form">
                    <MyTextInput placeholder="Display name" name="displayName" label="Display name" />
                    <MyTextArea placeholder="Add information about yourself" name="bio" rows={3} label="About you" />
                    <Button 
                        positive
                        type="submit"
                        content="Save"
                        disabled={!isValid || !dirty}
                        loading={isSubmitting}
                    />
                </Form>
            )}
        </Formik>
    );
}