<template lang="pug">
	.add-container
		.add-container__form-wrap
			input(v-model="person" @keyup.enter="$emit('addPerson', person)" placeholder="Añade un nombre")
			CustomButton(value='Añadir' @click.native="addPerson").button_save
</template>

<script>
import firebase from "firebase";
import { db } from "../main";
import CustomButton from "./CustomButton";
export default {
	name: "AddPerson",
	components: {
		CustomButton
	},
	props:{
		people: Array
	},
	data() {
		return {
			person: "",
		};
	},
	methods: {
		addPerson() {
			this.$emit('addPerson', this.person)
			this.person = null
		}
	}
};
</script>

<style lang="scss" scoped>
.add-container {
	width: 100%;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	padding: 20px;
	&__form-wrap {
		display: flex;
		flex-direction: row;
		input {
		font-size: 1.7rem;
		border: none;
		border-bottom: 1px solid #8e9aaf;
		-webkit-text-fill-color: #0d4657;
		-webkit-box-shadow: 0 0 0px 1000px white inset;
		-webkit-transition: background-color 5000s ease-in-out 0s;
		transition: background-color 5000s ease-in-out 0s;
		outline: none;
		height: 4rem;
		padding: 1.2rem;
		width: 25rem;
		opacity: 0.8;
		border-radius: 8px;
		margin-right: 2rem;
		outline: none;
		}
		.button_save {
			width: 20%;
		}
	}
}



</style>
